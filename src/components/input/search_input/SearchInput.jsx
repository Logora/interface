import React, { useState, useRef } from "react";
import { useIntl } from "react-intl";
import { TextInput } from '@logora/debate/input/text_input';
import { Icon } from '@logora/debate/icons/icon';
import useOnClickOutside from 'use-onclickoutside';
import styles from "./SearchInput.module.scss";

export const SearchInput = ({ onSearchSubmit, placeholder, disabled, reducedByDefault }) => {
	const intl = useIntl();
	const [query, setQuery] = useState("");
	const [openSearch, setOpenSearch] = useState(false);
	const searchRef = useRef(null);
	useOnClickOutside(searchRef, reducedByDefault ? () => setOpenSearch(false) : null);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearchSubmit(query);
	};

	const handleReset = (e) => {
		e.preventDefault();
		setQuery("");
		onSearchSubmit("");
	};

	return (
		!reducedByDefault || openSearch ?
			(
				<form data-tid={"form_search"} onSubmit={handleSubmit} method='get' autoComplete='off' ref={searchRef}>
					<TextInput
						type={"text"}
						name={"q"}
						aria-label={intl.formatMessage({
							id: "input.search_input.aria_label",
							defaultMessage: "Search bar"
						})}
						value={query}
						placeholder={placeholder}
						disabled={disabled}
						onChange={e => setQuery(e.target.value)}
						data-testid={"input_search_query"}
						data-tid={"input_search_query"}
						iconRight=
						{query &&
							<Icon name="close" className={styles.searchReset} data-tid={"action_search_reset"} height={16} width={16} onClick={(e) => handleReset(e)} aria-label={intl.formatMessage({id: "input.search_input.reset_icon.aria_label", defaultMessage: "Reset search"})} />
						}
						iconLeft={<Icon name="search" className={styles.searchSubmit} data-tid={"action_search_submit"} height={16} width={16} onClick={(e) => handleSubmit(e)} aria-label={intl.formatMessage({id: "input.search_input.submit_icon.aria_label", defaultMessage: "starts search"})} />
						}
					/>
				</form>
			)
			:
			(
				<div className={styles.searchReducedButton} onClick={() => setOpenSearch(true)}>
					<Icon name="search" className={styles.searchSubmit} data-tid={"action_search_submit"} height={20.8} width={16} />
				</div>
			)
	)
}

