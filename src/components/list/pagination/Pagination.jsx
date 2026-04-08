import React, { useState, useEffect } from 'react';
import { Loader } from '@logora/debate/progress/loader';
import { Button } from '@logora/debate/action/button';
import styles from './Pagination.module.scss';
import { Icon } from "@logora/debate/icons/icon";

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
                            handleClick={onLoad} 
                            {...rest}
                            rightIcon={<Icon name="lightArrow" height={10} width={10} />}
                        >
                            { buttonText }
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

