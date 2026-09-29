import { useEffect, useState } from "react";

const read = (key, initialState) => {
	try {
		const value = JSON.parse(sessionStorage.getItem(key));
		return value === null ? initialState : value;
	} catch (e) {
		return initialState;
	}
};

export const useSessionStorageState = (key, initialState) => {
	const [value, setValue] = useState(() => read(key, initialState));

	useEffect(() => {
		try {
			sessionStorage.setItem(key, JSON.stringify(value));
		} catch (e) {}
	}, [value]);

	const remove = () => {
		try {
			sessionStorage.removeItem(key);
		} catch (e) {}
	};

	return [value, setValue, remove];
};
