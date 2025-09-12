import React from 'react';
import { Loader } from '@logora/debate.progress.loader';
import { Button } from '@logora/debate.action.button';
import styles from './Pagination.module.scss';
import PropTypes from "prop-types";
import { Icon } from "@logora/debate.icons.icon";

export const Pagination = ({ lists, buttonText, ...rest }) => {
    const listEntries = Object.entries(lists || {});
    const hasNextPage = listEntries.some(([_, list]) => (list.currentPage * list.perPage) < list.totalElements);
    const isLoading = listEntries.some(([_, list]) => list.isLoading);
    const hideLoader = listEntries.every(([_, list]) => list.hideLoader);

    const handleLoad = () => {
        listEntries.forEach(([_, list]) => {
            if ((list.currentPage * list.perPage) < list.totalElements) {
                list.onLoad();
            }
        });
    };

    return (
        <>
            { hasNextPage ? (
                <div className={styles.paginationBox}>
                    { !isLoading ? (
                        <Button
                            handleClick={handleLoad}
                            {...rest}
                            rightIcon={<Icon name="lightArrow" height={10} width={10} />}
                        >
                            { buttonText }
                        </Button>
                    ) : (
                        hideLoader ? null : <Loader />
                    )}
                </div>
            ) : null}
        </>
    );
}

Pagination.propTypes = {
    lists: PropTypes.objectOf(PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        perPage: PropTypes.number.isRequired,
        totalElements: PropTypes.number.isRequired,
        onLoad: PropTypes.func,
        isLoading: PropTypes.bool,
        hideLoader: PropTypes.bool
    })),
    buttonText: PropTypes.string.isRequired
};