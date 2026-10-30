import { act, renderHook } from "@testing-library/react";
import {
	SCROLL_TO_EDITOR_MESSAGE,
	VIEWPORT_SETTLE_DELAY,
	useScrollToEditor,
} from "./useScrollToEditor";

const mountVisualViewport = () => {
	const viewport = new EventTarget();
	vi.spyOn(viewport, "addEventListener");
	vi.spyOn(viewport, "removeEventListener");
	Object.defineProperty(window, "visualViewport", {
		configurable: true,
		value: viewport,
	});
	return viewport;
};

const renderScrollHook = (mountTarget = true) => {
	const target = document.createElement("div");
	target.scrollIntoView = vi.fn();
	const targetRef = { current: mountTarget ? target : null };
	const { result, unmount } = renderHook(() => useScrollToEditor(targetRef));
	return { target, result, unmount };
};

const scrollAndFlushFrames = async (result) => {
	act(() => {
		result.current();
	});
	await act(async () => {
		vi.advanceTimersByTime(50);
	});
};

describe("useScrollToEditor", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
		delete window.visualViewport;
		delete window.top;
		delete window.parent;
	});

	it("should not scroll before the hook is called", async () => {
		const { target } = renderScrollHook();

		await act(async () => {
			vi.advanceTimersByTime(50);
		});

		expect(target.scrollIntoView).not.toHaveBeenCalled();
	});

	it("should scroll the editor into view once it is rendered", async () => {
		const { target, result } = renderScrollHook();

		await scrollAndFlushFrames(result);

		expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
		expect(target.scrollIntoView).toHaveBeenCalledWith({
			behavior: "smooth",
			block: "center",
		});
	});

	it("should not throw when the editor is not mounted yet", async () => {
		const { result } = renderScrollHook(false);

		expect(() => {
			act(() => {
				result.current();
			});
		}).not.toThrow();

		await act(async () => {
			vi.advanceTimersByTime(50);
		});
	});

	it("should re-scroll when the visual viewport resizes", async () => {
		const viewport = mountVisualViewport();
		const { target, result } = renderScrollHook();

		await scrollAndFlushFrames(result);
		act(() => {
			viewport.dispatchEvent(new Event("resize"));
		});

		expect(target.scrollIntoView).toHaveBeenCalledTimes(2);
		expect(target.scrollIntoView).toHaveBeenNthCalledWith(2, {
			behavior: "smooth",
			block: "center",
		});
	});

	it("should stop re-scrolling once the visual viewport settles", async () => {
		const viewport = mountVisualViewport();
		const { target, result } = renderScrollHook();

		await scrollAndFlushFrames(result);
		act(() => {
			vi.advanceTimersByTime(VIEWPORT_SETTLE_DELAY);
		});
		act(() => {
			viewport.dispatchEvent(new Event("resize"));
		});

		expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
		expect(viewport.removeEventListener).toHaveBeenCalledWith(
			"resize",
			expect.any(Function),
		);
	});

	it("should keep a single viewport listener when scrolled again before it settles", async () => {
		const viewport = mountVisualViewport();
		const { target, result } = renderScrollHook();

		await scrollAndFlushFrames(result);
		await scrollAndFlushFrames(result);
		act(() => {
			viewport.dispatchEvent(new Event("resize"));
		});

		expect(viewport.removeEventListener).toHaveBeenCalledWith(
			"resize",
			expect.any(Function),
		);
		expect(target.scrollIntoView).toHaveBeenCalledTimes(3);
	});

	it("should detach the viewport listener on unmount", async () => {
		const viewport = mountVisualViewport();
		const { target, result, unmount } = renderScrollHook();

		await scrollAndFlushFrames(result);
		unmount();
		act(() => {
			viewport.dispatchEvent(new Event("resize"));
		});

		expect(viewport.removeEventListener).toHaveBeenCalledWith(
			"resize",
			expect.any(Function),
		);
		expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
	});

	it("should relay the scroll to the host page when embedded", async () => {
		const postMessage = vi.fn();
		Object.defineProperty(window, "top", { configurable: true, value: {} });
		Object.defineProperty(window, "parent", {
			configurable: true,
			value: { postMessage },
		});
		const { result } = renderScrollHook();

		await scrollAndFlushFrames(result);

		expect(postMessage).toHaveBeenCalledWith(
			{ type: SCROLL_TO_EDITOR_MESSAGE, top: expect.any(Number) },
			"*",
		);
	});

	it("should relay the viewport re-scroll to the host page when embedded", async () => {
		const postMessage = vi.fn();
		const viewport = mountVisualViewport();
		Object.defineProperty(window, "top", { configurable: true, value: {} });
		Object.defineProperty(window, "parent", {
			configurable: true,
			value: { postMessage },
		});
		const { result } = renderScrollHook();

		await scrollAndFlushFrames(result);
		postMessage.mockClear();
		act(() => {
			viewport.dispatchEvent(new Event("resize"));
		});

		expect(postMessage).toHaveBeenCalledWith(
			{ type: SCROLL_TO_EDITOR_MESSAGE, top: expect.any(Number) },
			"*",
		);
	});

	it("should not relay the scroll when the page is top-level", async () => {
		const postMessage = vi.fn();
		Object.defineProperty(window, "top", { configurable: true, value: window });
		Object.defineProperty(window, "parent", {
			configurable: true,
			value: { postMessage },
		});
		const { result } = renderScrollHook();

		await scrollAndFlushFrames(result);

		expect(postMessage).not.toHaveBeenCalled();
	});
});
