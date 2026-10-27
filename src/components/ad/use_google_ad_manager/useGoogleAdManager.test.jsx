import { render } from "@testing-library/react";
import React from "react";
import { useGoogleAdManager } from "./useGoogleAdManager";

const gptSrc = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";

const flushCommandQueue = () => {
	const queue = window.googletag.cmd;
	window.googletag.cmd = [];
	queue.forEach((command) => command());
};

describe("useGoogleAdManager", () => {
	afterEach(() => {
		delete window.googletag;
	});

	it("should load GPT script correctly", async () => {
		vi.spyOn(document.body, "appendChild");

		const ComponentWithGoogleAdManager = () => {
			useGoogleAdManager(true, false);

			return <div>With GoogleAdManager</div>;
		};

		const container = render(<ComponentWithGoogleAdManager />);
		expect(container.getByText("With GoogleAdManager")).toBeTruthy();

		expect(document.body.appendChild).toBeCalledWith(
			expect.objectContaining({
				src: gptSrc,
			}),
		);
	});

	it("should load GPT script correctly with didomi consent", () => {
		vi.spyOn(document.body, "appendChild");

		const ComponentWithGoogleAdManager = () => {
			useGoogleAdManager(true, true);

			return <div>With GoogleAdManager and consent</div>;
		};

		const container = render(<ComponentWithGoogleAdManager />);

		expect(
			container.getByText("With GoogleAdManager and consent"),
		).toBeTruthy();

		expect(document.body.appendChild).toBeCalledWith(
			expect.objectContaining({
				type: "didomi/javascript",
				src: gptSrc,
			}),
		);
	});

	it("should only enable the ad services without changing network wide settings", () => {
		const pubads = {
			enableSingleRequest: vi.fn(),
			disableInitialLoad: vi.fn(),
			collapseEmptyDivs: vi.fn(),
			refresh: vi.fn(),
			addEventListener: vi.fn(),
		};
		const googletag = {
			cmd: [],
			pubads: () => pubads,
			enableServices: vi.fn(),
		};
		window.googletag = googletag;

		const ComponentWithGoogleAdManager = () => {
			useGoogleAdManager(true, false);

			return <div>With GoogleAdManager</div>;
		};

		render(<ComponentWithGoogleAdManager />);
		flushCommandQueue();

		expect(googletag.enableServices).toHaveBeenCalledTimes(1);
		expect(pubads.enableSingleRequest).not.toHaveBeenCalled();
		expect(pubads.disableInitialLoad).not.toHaveBeenCalled();
		expect(pubads.collapseEmptyDivs).not.toHaveBeenCalled();
		expect(pubads.addEventListener).not.toHaveBeenCalled();
		expect(pubads.refresh).not.toHaveBeenCalled();
	});
});
