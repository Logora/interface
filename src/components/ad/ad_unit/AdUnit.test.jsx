import { render } from "@testing-library/react";
import { act } from "react";
import React from "react";
import { AdUnit } from "./AdUnit";

const createSlot = (elementId) => {
	const slot = {
		elementId,
		targeting: {},
		getSlotElementId: () => slot.elementId,
		setTargeting: (key, value) => {
			slot.targeting[key] = value;
			return slot;
		},
		addService: () => slot,
	};
	return slot;
};

const setupGoogleTag = ({ existingSlots = [] } = {}) => {
	const definedSlots = [];
	const impressionListeners = [];
	const pubads = {
		getSlots: () => existingSlots,
		refresh: vi.fn(),
		addEventListener: vi.fn((eventName, listener) => {
			if (eventName === "impressionViewable") {
				impressionListeners.push(listener);
			}
		}),
		removeEventListener: vi.fn((eventName, listener) => {
			const index = impressionListeners.indexOf(listener);
			if (index >= 0) {
				impressionListeners.splice(index, 1);
			}
		}),
	};
	const googletag = {
		cmd: [],
		pubads: () => pubads,
		defineSlot: vi.fn((adPath, sizes, divId) => {
			const slot = createSlot(divId);
			definedSlots.push(slot);
			return slot;
		}),
		display: vi.fn(),
		destroySlots: vi.fn(),
		enableServices: vi.fn(),
	};
	window.googletag = googletag;
	return { googletag, pubads, definedSlots, impressionListeners };
};

const flushCommandQueue = () => {
	const queue = window.googletag.cmd;
	window.googletag.cmd = [];
	queue.forEach((command) => command());
};

describe("AdUnit", () => {
	afterEach(() => {
		vi.useRealTimers();
		delete window.googletag;
	});

	it("should render nothing if id is empty", () => {
		const { container } = render(
			<AdUnit id={""} adPath={"/path"} sizes={[[300, 250]]} />,
		);

		expect(container).toBeEmptyDOMElement();
	});

	it("should render nothing if adPath is empty", () => {
		const { container } = render(
			<AdUnit id={"div-id"} adPath={""} sizes={[[300, 250]]} />,
		);

		expect(container).toBeEmptyDOMElement();
	});

	it("should render div if correct props are passed", () => {
		const adPath = "/path";
		const id = "slot-id";

		const { container } = render(
			<AdUnit id={id} adPath={adPath} sizes={[[300, 250]]} />,
		);

		expect(container.firstChild?.firstChild.id).toBe(`div-gpt-ad-${id}`);
	});

	it("should set didomi script if consent is true", () => {
		const adPath = "/path";
		const id = "slot-id";

		const { container } = render(
			<AdUnit id={id} adPath={adPath} sizes={[[300, 250]]} enableDidomi />,
		);

		expect(container.firstChild.tagName).toBe("SCRIPT");
		expect(container.firstChild.type).toBe("didomi/html");
		expect(container.firstChild.getAttribute("data-vendor")).toBe(
			"didomi:google",
		);
		expect(container.firstChild?.firstChild?.firstChild.id).toBe(
			`div-gpt-ad-${id}`,
		);
	});

	it("should define its slot as a logora slot and display it only once", () => {
		const { googletag, pubads, definedSlots } = setupGoogleTag();

		render(<AdUnit id={"slot-id"} adPath={"/path"} sizes={[[300, 250]]} />);
		flushCommandQueue();

		expect(googletag.defineSlot).toHaveBeenCalledWith(
			"/path",
			[[300, 250]],
			"div-gpt-ad-slot-id",
		);
		expect(definedSlots[0].targeting.origine).toEqual(["logora"]);
		expect(googletag.display).toHaveBeenCalledTimes(1);
		expect(googletag.display).toHaveBeenCalledWith("div-gpt-ad-slot-id");
		expect(pubads.refresh).not.toHaveBeenCalled();
	});

	it("should not define a slot that already exists on the page", () => {
		const existingSlot = createSlot("div-gpt-ad-slot-id");
		const { googletag } = setupGoogleTag({ existingSlots: [existingSlot] });

		render(<AdUnit id={"slot-id"} adPath={"/path"} sizes={[[300, 250]]} />);
		flushCommandQueue();

		expect(googletag.defineSlot).not.toHaveBeenCalled();
		expect(googletag.display).not.toHaveBeenCalled();
	});

	it("should not refresh the slot when another slot becomes viewable", () => {
		vi.useFakeTimers();
		const { pubads, impressionListeners } = setupGoogleTag();

		render(<AdUnit id={"slot-id"} adPath={"/path"} sizes={[[300, 250]]} />);
		flushCommandQueue();

		act(() => {
			for (const listener of impressionListeners) {
				listener({ slot: createSlot("div-gpt-ad-publisher-banner") });
			}
		});
		vi.advanceTimersByTime(30000);
		flushCommandQueue();

		expect(pubads.refresh).not.toHaveBeenCalled();
	});

	it("should refresh its own slot after the refresh rate", () => {
		vi.useFakeTimers();
		const { pubads, definedSlots, impressionListeners } = setupGoogleTag();

		render(
			<AdUnit
				id={"slot-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
				refreshRate={5000}
			/>,
		);
		flushCommandQueue();

		act(() => {
			for (const listener of impressionListeners) {
				listener({ slot: definedSlots[0] });
			}
		});
		vi.advanceTimersByTime(4999);
		flushCommandQueue();
		expect(pubads.refresh).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		flushCommandQueue();
		expect(pubads.refresh).toHaveBeenCalledTimes(1);
		expect(pubads.refresh).toHaveBeenCalledWith([definedSlots[0]]);
	});

	it("should default to a 30 seconds refresh rate", () => {
		vi.useFakeTimers();
		const { pubads, definedSlots, impressionListeners } = setupGoogleTag();

		render(<AdUnit id={"slot-id"} adPath={"/path"} sizes={[[300, 250]]} />);
		flushCommandQueue();

		act(() => {
			for (const listener of impressionListeners) {
				listener({ slot: definedSlots[0] });
			}
		});
		vi.advanceTimersByTime(29999);
		flushCommandQueue();
		expect(pubads.refresh).not.toHaveBeenCalled();

		vi.advanceTimersByTime(1);
		flushCommandQueue();
		expect(pubads.refresh).toHaveBeenCalledTimes(1);
		expect(pubads.refresh).toHaveBeenCalledWith([definedSlots[0]]);
	});

	it("should not refresh its slot after unmount", () => {
		vi.useFakeTimers();
		const { pubads, definedSlots, impressionListeners } = setupGoogleTag();

		const { unmount } = render(
			<AdUnit id={"slot-id"} adPath={"/path"} sizes={[[300, 250]]} />,
		);
		flushCommandQueue();
		const listener = impressionListeners[0];

		act(() => listener({ slot: definedSlots[0] }));
		unmount();
		flushCommandQueue();
		vi.advanceTimersByTime(30000);
		flushCommandQueue();

		expect(pubads.refresh).not.toHaveBeenCalled();
		expect(pubads.removeEventListener).toHaveBeenCalledWith(
			"impressionViewable",
			listener,
		);
	});
});
