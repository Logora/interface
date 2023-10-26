import React, { useState, useEffect } from 'react';
import { Loader } from '@logora/debate.progress.loader';
import { Button } from '@logora/debate.action.button';
import styles from './Pagination.module.scss';
import PropTypes from "prop-types";
import { Icon } from "@logora/debate.icons.icon";

export const Pagination = ({ currentPage, perPage, totalElements, buttonText, onLoad, isLoading, hideLoader, ...rest }) => {
    const [hasNextPage, setHasNextPage] = useState((currentPage * perPage) < totalElements)

    useEffect(() => {
        if (totalElements > 0) {
            setHasNextPage((currentPage * perPage) < totalElements);
        }
    }, [totalElements, currentPage])
    
    return (
        <>
            { hasNextPage ? (
                <div className={styles.paginationBox}>
                    { !isLoading ? (
                        <Button
                            className={styles.paginationButton} 
                            handleClick={onLoad} 
                            active
                            {...rest}
                        >
                            { buttonText }
                            <Icon className={styles.paginationIcon} name="lightArrow" height={14} width={14} />
                        </Button>
                    ) : (
                        hideLoader ?
                            null
                        :
                            <Loader />
                    )}
                </div>
            ) : null}
        </>
    );
}

Pagination.propTypes = {
    /** Number of the current page */
    currentPage: PropTypes.number,
    /** Number of elements per page */
    perPage: PropTypes.number,
    /** Number of elements in total */
    totalElements: PropTypes.number,
    /** Text displayed on the button */
    buttonText: PropTypes.string.isRequired,
    /** Callback function triggered when clicking on the pagination button */
    onLoad: PropTypes.func,
    /** Boolean to control the loading state */
    isLoading: PropTypes.bool,
    /** If `true`, will not show the loader on load */
    hideLoader: PropTypes.bool,
    /** Extra props passed to the button */
    rest: PropTypes.object
  };