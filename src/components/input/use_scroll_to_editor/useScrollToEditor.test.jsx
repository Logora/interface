import { act, renderHook } from "@testing-library/react";
import { useScrollToEditor } from "./useScrollToEditor";

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

	it("should cancel the pending scroll on unmount", async () => {
		const { target, result, unmount } = renderScrollHook();

		act(() => {
			result.current();
		});
		unmount();
		await act(async () => {
			vi.advanceTimersByTime(50);
		});

		expect(target.scrollIntoView).not.toHaveBeenCalled();
	});
});
