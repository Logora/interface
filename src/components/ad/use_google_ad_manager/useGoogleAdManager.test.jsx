import { render } from "@testing-library/react";
import React from "react";

const gptSrc = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

const loadHook = async () => {
	const { useGoogleAdManager } = await import("./useGoogleAdManager");
	return useGoogleAdManager;
};

const mountHook = async (useGoogleAdManager, ...args) => {
	const ComponentWithGoogleAdManager = () => {
		useGoogleAdManager(...args);
		return <div>With GoogleAdManager</div>;
	};
	return render(<ComponentWithGoogleAdManager />);
};

describe("useGoogleAdManager", () => {
	beforeEach(() => {
		vi.resetModules();
		document.body.innerHTML = "";
		delete window.googletag;
	});

	it("should expose the canonical GPT URL", async () => {
		const { GPT_SRC } = await import("./useGoogleAdManager");

		expect(GPT_SRC).toBe(gptSrc);
	});

	it("should load GPT script correctly", async () => {
		const useGoogleAdManager = await loadHook();
		const container = await mountHook(useGoogleAdManager, true, false);

		expect(container.getByText("With GoogleAdManager")).toBeTruthy();
		expect(document.body.querySelector(`script[src="${gptSrc}"]`)).toBeTruthy();
	});

	it("should load GPT script correctly with didomi consent", async () => {
		const useGoogleAdManager = await loadHook();
		const container = await mountHook(useGoogleAdManager, true, true);

		expect(container.getByText("With GoogleAdManager")).toBeTruthy();
		const script = document.body.querySelector(`script[src="${gptSrc}"]`);
		expect(script.type).toBe("didomi/javascript");
		expect(script.getAttribute("data-vendor-raw")).toBe("didomi:google");
	});

	it("should inject the GPT script only once across mounts", async () => {
		const useGoogleAdManager = await loadHook();
		const appendSpy = vi.spyOn(document.body, "appendChild");

		await mountHook(useGoogleAdManager, true, false);
		await mountHook(useGoogleAdManager, true, false);

		const scripts = document.body.querySelectorAll(`script[src="${gptSrc}"]`);
		expect(scripts.length).toBe(1);
		expect(
			appendSpy.mock.calls.filter(
				([node]) => node.tagName === "SCRIPT" && node.src === gptSrc,
			).length,
		).toBe(1);
	});

	it("should reuse a publisher-provided googletag without page-wide pubads settings", async () => {
		const pubads = {
			enableSingleRequest: vi.fn(),
			disableInitialLoad: vi.fn(),
			collapseEmptyDivs: vi.fn(),
		};
		const listeners = {};
		window.googletag = {
			cmd: [],
			apiReady: true,
			pubads: () => pubads,
			enableServices: vi.fn(),
			__listeners: listeners,
		};
		window.googletag.cmd.push = (fn) => fn();
		pubads.addEventListener = vi.fn((type, handler) => {
			listeners[type] = handler;
		});

		const useGoogleAdManager = await loadHook();
		await mountHook(useGoogleAdManager, true, false);

		expect(window.googletag.enableServices).toHaveBeenCalledTimes(1);
		expect(pubads.enableSingleRequest).not.toHaveBeenCalled();
		expect(pubads.disableInitialLoad).not.toHaveBeenCalled();
		expect(pubads.collapseEmptyDivs).not.toHaveBeenCalled();
		expect(pubads.addEventListener).not.toHaveBeenCalled();
	});

	it("should leave GPT configuration to a page that already loads gpt.js", async () => {
		const existing = document.createElement("script");
		existing.src = gptSrc;
		document.body.appendChild(existing);
		const pubads = { enableSingleRequest: vi.fn() };
		const enableServices = vi.fn();
		window.googletag = {
			cmd: { push: (fn) => fn() },
			apiReady: true,
			pubads: () => pubads,
			enableServices,
		};

		const useGoogleAdManager = await loadHook();
		await mountHook(useGoogleAdManager, true, false);

		expect(document.body.querySelectorAll(`script[src="${gptSrc}"]`).length).toBe(1);
		expect(enableServices).not.toHaveBeenCalled();
		expect(pubads.enableSingleRequest).not.toHaveBeenCalled();
	});

	it("should not load anything when disabled", async () => {
		const useGoogleAdManager = await loadHook();
		await mountHook(useGoogleAdManager, false, false);

		expect(document.body.querySelector(`script[src="${gptSrc}"]`)).toBeNull();
	});
});
