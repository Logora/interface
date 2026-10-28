import { render } from "@testing-library/react";
import React from "react";
import { AdUnit } from "./AdUnit";

const createSlot = (elementId) => {
	const targeting = {};
	const slot = {
		getSlotElementId: () => elementId,
		getTargeting: (key) => targeting[key] || [],
		setTargeting: vi.fn((key, value) => {
			targeting[key] = value;
			return slot;
		}),
		setCollapseEmptyDiv: vi.fn(),
		addService: vi.fn(() => slot),
	};
	return slot;
};

const setupGpt = (initialSlots = []) => {
	const state = { slots: [...initialSlots], listeners: {} };
	const pubads = {
		getSlots: () => state.slots,
		refresh: vi.fn(),
		isInitialLoadDisabled: () => false,
		addEventListener: vi.fn((type, handler) => {
			state.listeners[type] = [...(state.listeners[type] || []), handler];
		}),
		removeEventListener: vi.fn((type, handler) => {
			state.listeners[type] = (state.listeners[type] || []).filter(
				(h) => h !== handler,
			);
		}),
	};
	window.googletag = {
		cmd: { push: (fn) => fn() },
		defineSlot: vi.fn((path, sizes, id) => {
			const slot = createSlot(id);
			state.slots.push(slot);
			return slot;
		}),
		display: vi.fn(),
		destroySlots: vi.fn((slots) => {
			state.slots = state.slots.filter((s) => !slots.includes(s));
		}),
		pubads: () => pubads,
		enableServices: vi.fn(),
	};
	state.pubads = pubads;
	return state;
};

const fireImpressionViewable = (state, slot) => {
	(state.listeners.impressionViewable || []).forEach((handler) =>
		handler({ slot }),
	);
};

describe("AdUnit", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
		Object.defineProperty(document, "visibilityState", {
			configurable: true,
			value: "visible",
		});
	});

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

	it("should define its own slot and display it once without refreshing", () => {
		const state = setupGpt();

		render(<AdUnit id={"slot-id"} adPath={"/path"} sizes={[[300, 250]]} />);

		expect(window.googletag.defineSlot).toHaveBeenCalledTimes(1);
		expect(window.googletag.display).toHaveBeenCalledTimes(1);
		expect(window.googletag.display).toHaveBeenCalledWith("div-gpt-ad-slot-id");
		const slot = state.slots[0];
		expect(slot.setTargeting).toHaveBeenCalledWith("origine", ["logora"]);
		expect(slot.addService).toHaveBeenCalledTimes(1);
		expect(state.pubads.refresh).not.toHaveBeenCalled();
		expect(state.pubads.addEventListener).not.toHaveBeenCalled();
	});

	it("should destroy a stale slot on the same div instead of redefining", () => {
		const stale = createSlot("div-gpt-ad-slot-id");
		const state = setupGpt([stale]);

		render(<AdUnit id={"slot-id"} adPath={"/path"} sizes={[[300, 250]]} />);

		expect(window.googletag.destroySlots).toHaveBeenCalledWith([stale]);
		expect(state.slots).toHaveLength(1);
		expect(state.slots[0]).not.toBe(stale);
		expect(window.googletag.display).toHaveBeenCalledTimes(1);
	});

	it("should refresh only its own slot after 30s on a viewable impression", () => {
		vi.useFakeTimers();
		const state = setupGpt();
		const thirdPartySlot = createSlot("publisher-slot");

		render(
			<AdUnit
				id={"slot-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
				refresh={true}
			/>,
		);
		const ownSlot = state.slots[0];

		fireImpressionViewable(state, thirdPartySlot);
		vi.advanceTimersByTime(60000);
		expect(state.pubads.refresh).not.toHaveBeenCalled();

		fireImpressionViewable(state, ownSlot);
		vi.advanceTimersByTime(29999);
		expect(state.pubads.refresh).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);
		expect(state.pubads.refresh).toHaveBeenCalledTimes(1);
		expect(state.pubads.refresh).toHaveBeenCalledWith([ownSlot]);
	});

	it("should clamp the refresh interval to a 30s minimum", () => {
		vi.useFakeTimers();
		const state = setupGpt();

		render(
			<AdUnit
				id={"slot-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
				refresh={true}
				refreshInterval={8000}
			/>,
		);

		fireImpressionViewable(state, state.slots[0]);
		vi.advanceTimersByTime(8000);
		expect(state.pubads.refresh).not.toHaveBeenCalled();
		vi.advanceTimersByTime(22000);
		expect(state.pubads.refresh).toHaveBeenCalledTimes(1);
	});

	it("should not refresh when the tab is hidden at timer expiry", () => {
		vi.useFakeTimers();
		const state = setupGpt();

		render(
			<AdUnit
				id={"slot-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
				refresh={true}
			/>,
		);
		const ownSlot = state.slots[0];
		fireImpressionViewable(state, ownSlot);

		Object.defineProperty(document, "visibilityState", {
			configurable: true,
			value: "hidden",
		});
		vi.advanceTimersByTime(30000);
		expect(state.pubads.refresh).not.toHaveBeenCalled();

		vi.advanceTimersByTime(60000);
		expect(state.pubads.refresh).not.toHaveBeenCalled();

		Object.defineProperty(document, "visibilityState", {
			configurable: true,
			value: "visible",
		});
		fireImpressionViewable(state, ownSlot);
		vi.advanceTimersByTime(30000);
		expect(state.pubads.refresh).toHaveBeenCalledTimes(1);
		expect(state.pubads.refresh).toHaveBeenCalledWith([ownSlot]);
	});

	it("should take a refresh prop enabled after mount into account", () => {
		vi.useFakeTimers();
		const state = setupGpt();

		const { rerender } = render(
			<AdUnit id={"slot-id"} adPath={"/path"} sizes={[[300, 250]]} />,
		);
		expect(state.pubads.addEventListener).not.toHaveBeenCalled();

		rerender(
			<AdUnit
				id={"slot-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
				refresh={true}
			/>,
		);
		expect(window.googletag.defineSlot).toHaveBeenCalledTimes(1);

		fireImpressionViewable(state, state.slots[0]);
		vi.advanceTimersByTime(30000);
		expect(state.pubads.refresh).toHaveBeenCalledTimes(1);
	});

	it("should refresh once immediately when the page disabled initial load", () => {
		const state = setupGpt();
		state.pubads.isInitialLoadDisabled = () => true;

		render(
			<AdUnit
				id={"slot-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
			/>,
		);

		expect(window.googletag.display).toHaveBeenCalledTimes(1);
		expect(state.pubads.refresh).toHaveBeenCalledTimes(1);
		expect(state.pubads.refresh).toHaveBeenCalledWith([state.slots[0]]);
		expect(state.pubads.addEventListener).not.toHaveBeenCalled();
	});

	it("should resume the deferred refresh when the tab becomes visible again", () => {
		vi.useFakeTimers();
		const state = setupGpt();

		render(
			<AdUnit
				id={"slot-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
				refresh={true}
			/>,
		);
		const ownSlot = state.slots[0];
		fireImpressionViewable(state, ownSlot);

		Object.defineProperty(document, "visibilityState", {
			configurable: true,
			value: "hidden",
		});
		vi.advanceTimersByTime(30000);
		expect(state.pubads.refresh).not.toHaveBeenCalled();

		Object.defineProperty(document, "visibilityState", {
			configurable: true,
			value: "visible",
		});
		document.dispatchEvent(new Event("visibilitychange"));
		expect(state.pubads.refresh).not.toHaveBeenCalled();
		vi.advanceTimersByTime(30000);
		expect(state.pubads.refresh).toHaveBeenCalledTimes(1);
		expect(state.pubads.refresh).toHaveBeenCalledWith([ownSlot]);
	});

	it("should cancel the refresh timer and destroy its slot on unmount", () => {

		vi.useFakeTimers();
		const state = setupGpt();

		const { unmount } = render(
			<AdUnit
				id={"slot-id"}
				adPath={"/path"}
				sizes={[[300, 250]]}
				refresh={true}
			/>,
		);
		const ownSlot = state.slots[0];
		fireImpressionViewable(state, ownSlot);
		unmount();

		vi.advanceTimersByTime(60000);
		expect(state.pubads.refresh).not.toHaveBeenCalled();
		expect(window.googletag.destroySlots).toHaveBeenCalledWith([ownSlot]);
		expect(state.pubads.removeEventListener).toHaveBeenCalledWith(
			"impressionViewable",
			expect.any(Function),
		);
	});
});
