import React, { useState, useRef } from "react";
import { SearchIcon, CloseIcon } from '@logora/debate.icons';
import { TextInput } from '@logora/debate.input.text_input';
import useOnClickOutside from 'use-onclickoutside';
import styles from "./SearchInput.module.scss";
import PropTypes from "prop-types";

export const SearchInput = ({ onSearchSubmit, placeholder, disabled, reducedByDefault }) => {
	const [query, setQuery] = useState("");
	const [openSearch, setOpenSearch] = useState(false);
	const searchRef = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query) {
			onSearchSubmit(query);
		}
	};

	const handleReset = (e) => {
		e.preventDefault();
		setQuery("");
		onSearchSubmit("");
	};

	if(reducedByDefault) {
		useOnClickOutside(searchRef, () => setOpenSearch(false));
	}

	return (
		!reducedByDefault || openSearch ? 
			(
				<form data-tid={"form_search"} onSubmit={handleSubmit} method='get' autoComplete='off' ref={searchRef}>
					<TextInput
						type={"text"}
						name={"q"}
						role={"input"}
						value={query}
						placeholder={placeholder}
						disabled={disabled}
						onChange={e => setQuery(e.target.value)}
						data-testid={"input_search_query"}
						data-tid={"input_search_query"}
						icon={query ? <CloseIcon className={styles.searchReset} role="submit" data-tid={"action_search_reset"} height={16} width={16} onClick={(e) => handleReset(e)} /> : <SearchIcon className={styles.searchSubmit} role="submit" data-tid={"action_search_submit"} height={16} width={16} onClick={(e) => handleSubmit(e)} />}
					/>
				</form>	
			) 
		:
			(
				<div className={styles.searchReducedButton} onClick={() => setOpenSearch(true)}>
					<SearchIcon className={styles.searchSubmit} data-tid={"action_search_submit"} height={20.8} width={16} />
				</div>
			)
	)
}

SearchInput.propTypes = {
    /** Callback function for submit */
    onSearchSubmit: PropTypes.func.isRequired,
    /** Text of the placeholder */
    placeholder: PropTypes.string,
    /** If true, the component is disabled  */
    disabled: PropTypes.bool,
    /**  If true, the component is reduced by default */
    reducedByDefault: PropTypes.bool,
};