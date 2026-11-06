import { ModalContext } from "@logora/debate/dialog/modal";
import { act, renderHook } from "@testing-library/react";
import { useState } from "react";
import { useScrollToEditor } from "./useScrollToEditor";

const renderScrollHook = ({
	mountTarget = true,
	isModalPresent = false,
	withModalProvider = true,
} = {}) => {
	const target = document.createElement("div");
	target.scrollIntoView = vi.fn();
	const targetRef = { current: mountTarget ? target : null };
	let setModalOpen;

	const Wrapper = ({ children }) => {
		const [modalOpen, setOpen] = useState(isModalPresent);
		setModalOpen = setOpen;
		return (
			<ModalContext.Provider value={{ isModalPresent: modalOpen }}>
				{children}
			</ModalContext.Provider>
		);
	};

	const { result, unmount } = renderHook(() => useScrollToEditor(targetRef), {
		wrapper: withModalProvider ? Wrapper : undefined,
	});

	const toggleModal = (open) =>
		act(async () => {
			setModalOpen(open);
		});

	return { target, result, unmount, toggleModal };
};

const scrollAndFlushFrames = async (result) => {
	act(() => {
		result.current();
	});
	await act(async () => {
		vi.advanceTimersByTime(50);
	});
};

const flushFrames = () =>
	act(async () => {
		vi.advanceTimersByTime(50);
	});

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

		await flushFrames();

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
		const { result } = renderScrollHook({ mountTarget: false });

		expect(() => {
			act(() => {
				result.current();
			});
		}).not.toThrow();

		await flushFrames();
	});

	it("should cancel the pending scroll on unmount", async () => {
		const { target, result, unmount } = renderScrollHook();

		act(() => {
			result.current();
		});
		unmount();
		await flushFrames();

		expect(target.scrollIntoView).not.toHaveBeenCalled();
	});

	it("should scroll as before when no modal provider is mounted", async () => {
		const { target, result } = renderScrollHook({ withModalProvider: false });

		await scrollAndFlushFrames(result);

		expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
	});

	it("should defer the scroll while a modal is open and replay it on close", async () => {
		const { target, result, toggleModal } = renderScrollHook({
			isModalPresent: true,
		});

		await scrollAndFlushFrames(result);

		expect(target.scrollIntoView).not.toHaveBeenCalled();

		await toggleModal(false);
		await flushFrames();

		expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
		expect(target.scrollIntoView).toHaveBeenCalledWith({
			behavior: "smooth",
			block: "center",
		});
	});

	it("should defer a scroll requested before the modal opens and replay it on close", async () => {
		const { target, result, toggleModal } = renderScrollHook();

		act(() => {
			result.current();
		});
		await toggleModal(true);
		await flushFrames();

		expect(target.scrollIntoView).not.toHaveBeenCalled();

		await toggleModal(false);
		await flushFrames();

		expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
	});

	it("should not replay the scroll once it has been applied", async () => {
		const { target, result, toggleModal } = renderScrollHook();

		await scrollAndFlushFrames(result);
		expect(target.scrollIntoView).toHaveBeenCalledTimes(1);

		await toggleModal(true);
		await toggleModal(false);
		await flushFrames();

		expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
	});

	it("should keep the deferred scroll when the editor is not mounted on close", async () => {
		const { result, unmount, toggleModal } = renderScrollHook({
			mountTarget: false,
			isModalPresent: true,
		});

		await scrollAndFlushFrames(result);
		await toggleModal(false);
		await flushFrames();

		expect(() => unmount()).not.toThrow();
	});
});
