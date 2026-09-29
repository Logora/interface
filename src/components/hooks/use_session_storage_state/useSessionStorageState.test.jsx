import { act, renderHook } from "@testing-library/react";
import { useSessionStorageState } from "./useSessionStorageState";

describe("useSessionStorageState", () => {
	afterEach(() => {
		vi.restoreAllMocks();
		sessionStorage.clear();
	});

	it("should read, save and remove the value", () => {
		sessionStorage.setItem("key", JSON.stringify({ a: 1 }));
		const { result } = renderHook(() => useSessionStorageState("key", {}));
		expect(result.current[0]).toEqual({ a: 1 });

		act(() => result.current[1]({ a: 2 }));
		expect(JSON.parse(sessionStorage.getItem("key"))).toEqual({ a: 2 });

		act(() => result.current[2]());
		expect(sessionStorage.getItem("key")).toBeNull();
	});

	it("should not throw when storage is full or blocked", () => {
		const error = () => {
			throw new DOMException("quota", "QuotaExceededError");
		};
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(error);
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(error);
		vi.spyOn(Storage.prototype, "removeItem").mockImplementation(error);

		const { result } = renderHook(() => useSessionStorageState("key", {}));
		expect(result.current[0]).toEqual({});
		act(() => result.current[1]({ a: 2 }));
		expect(result.current[0]).toEqual({ a: 2 });
		act(() => result.current[2]());
	});
});
