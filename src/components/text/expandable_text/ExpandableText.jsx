import React, { useState, useEffect, useRef } from 'react';
import { ArrowIcon } from './ArrowIcon';
import styles from './ExpandableText.module.scss';
import cx from 'classnames';

export const ExpandableText = (
    { 
        children, 
        expandable = true, 
        expandText = "Read more", 
        collapseText = "Read less", 
        className,
        maxHeight = "100", 
        showIcon = true,
        backgroundColor = "var(--background-color-primary)",
        onCollapse = () => {}, 
        onExpand = () => {}, 
		isReply = false,
    }
) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);
	const contentRef = useRef(null);

	useEffect(() => {
		if(expandable) {
			setContentHeight(getContentHeight());
		}
	}, []);

	const getContentHeight = () => {
		const heightPx = contentRef.current.clientHeight;
		return Math.round(heightPx);
	};

	const handleCollapse = () => {
		setIsExpanded(false);
		onCollapse();
	};

	const handleExpand = () => {
		setIsExpanded(true);
		onExpand();
	};

    const shouldShowButton = expandable && (contentHeight > maxHeight);
    const contentStyles = { maxHeight: maxHeight + "px", marginBottom: "10px" }
	const maskStyles = { background: isReply ? `linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--text-tertiary) 90%)` : `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${backgroundColor} 90%)`}

    return (
        <div className={styles.container} ref={contentRef}>
            <div 
                style={ shouldShowButton && !isExpanded ? contentStyles : {}} 
                className={cx({ [styles.contentMask]: shouldShowButton && !isExpanded })}
            >
                { children }
            </div>
			{ shouldShowButton &&
				( !isExpanded ?
					<div 
						style={ shouldShowButton && !isExpanded ? maskStyles : {}} 
						className={styles.linkContainer} 
						onClick={() => handleExpand()}
					>
						<div className={cx(styles.link, className)}>
							<span>{expandText}</span>
                            { showIcon && <ArrowIcon height={16} width={16} /> }
						</div>
					</div> 
					:
					<div className={styles.linkContainerExpanded} onClick={() => handleCollapse()}>
						<div className={cx(styles.linkExpanded, className)}>
							<span>{collapseText}</span>
                            { showIcon && <ArrowIcon height={16} width={16} /> }
						</div>
					</div>
				)
			}
        </div>
    )
}