import useSessionStorageState from "@rooks/use-sessionstorage-state";
import { flatten } from "flat";
import React, { useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { IntlContext } from "./IntlContext";

export const IntlProvider = ({
	language,
	locales,
	async = false,
	customMessages = {},
	children,
	onError,
}) => {
	const [storedLocale, setStoredLocale] = useSessionStorageState(
		"logora:locale",
		null,
	);

	const getLocale = () => {
		if (storedLocale) {
			return storedLocale;
		} else if (language) {
			return language;
		}
	};

	const getMessages = () => {
		if (!async && locale in locales) {
			return locales[locale];
		} else {
			return {};
		}
	};

	const [locale, setLocale] = useState(getLocale());
	const [messages, setMessages] = useState(getMessages());

	useEffect(() => {
		if (locale) {
			if (async && locale in locales) {
				locales[locale]()
					.then((m) => {
						setMessages(m?.default || m);
					})
					.catch(() => setMessages({}));
			}

			if (storedLocale !== locale) {
				setStoredLocale(locale);
			}
		}
	}, [locale]);

	const mergeRemoteMessages = (messages) => {
		const updatedMessages = { ...messages };
		Object.keys(updatedMessages).forEach((k) => {
			if (Object.keys(customMessages).indexOf(k) > -1) {
				updatedMessages[k] = customMessages[k];
			}
		});
		return updatedMessages;
	};

	const displayContext = () => {
		return (
			<ReactIntlProvider
				locale={locale}
				messages={mergeRemoteMessages(flatten(messages))}
				onError={onError}
			>
				<IntlContext.Provider value={{ locale, setLocale }}>
					{children}
				</IntlContext.Provider>
			</ReactIntlProvider>
		);
	};

	return (
		<>
			{async && typeof window !== "undefined"
				? Object.keys(messages).length > 0
					? displayContext()
					: null
				: displayContext()}
		</>
	);
};
