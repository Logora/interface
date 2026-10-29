import { act, renderHook } from "@testing-library/react";
import { useScrollToEditor } from "./useScrollToEditor";

const waitForPaint = () =>
	new Promise((resolve) => {
		setTimeout(resolve, 50);
	});

const renderScrollHook = (mountTarget = true) => {
	const target = document.createElement("div");
	target.scrollIntoView = vi.fn();
	const targetRef = { current: mountTarget ? target : null };
	const { result } = renderHook(() => useScrollToEditor(targetRef));
	return { target, result };
};

describe("useScrollToEditor", () => {
	it("should not scroll before the hook is called", async () => {
		const { target } = renderScrollHook();

		await act(async () => {
			await waitForPaint();
		});

		expect(target.scrollIntoView).not.toHaveBeenCalled();
	});

	it("should scroll the editor into view once it is rendered", async () => {
		const { target, result } = renderScrollHook();

		act(() => {
			result.current();
		});
		await act(async () => {
			await waitForPaint();
		});

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
			await waitForPaint();
		});
	});
});
