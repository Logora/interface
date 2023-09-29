import React from 'react';
import cx from 'classnames';
import styles from './ProgressBar.module.scss';

export const ProgressBar = (props) => {
    const percentage = Number((((props.goal === 0 ? 0 : (props.progress || 0)) / (props.goal === 0 ? 1 : props.goal)) * 100).toFixed(1));

    return (
        <div className={styles.progressContainer}>
            <div className={styles.titleContainer}>
                { props.title &&
                    <div className={styles.title}>
                        { props.title }
                    </div>
                }
                { props.showProgressSubtitle &&
                    <div className={cx(styles.subtitleContainer, props.subtitleClassName, {[styles.left]: props.isLeft})}>
                        {props.barFull ?
                            <span className={styles.progressSubtitle}>
                                {`${props.progress} ${props.progressUnit || ""}`}
                            </span> 
                        :
                            <span className={styles.progressSubtitle}>
                                {`${props.progress || 0} / ${props.goal} ${props.progressUnit || ""} (${percentage}%)`}
                            </span>
                        }
                    </div>
                }
                { props.showPercentageSubtitle &&
                    <div className={cx(styles.subtitleContainer, props.subtitleClassName, {[styles.left]: props.isLeft})}>
                        <span>{`${percentage}%`}</span>
                    </div>
                }
            </div>
            <div className={cx(styles.progressBarContainer, props.className)} role="progress">
                <div className={styles.currentProgressBar} style={{width: (percentage >= 100 || props.barFull) ? "100%" : percentage + "%"}} role="progressbar" aria-valuemin="0" aria-valuenow={(percentage >= 100 || props.barFull) ? 100 : percentage} aria-valuemax={"100"}>
                    <div className={cx(styles.progressBar, props.innerClassName)}>
                        <div className={cx(styles.progressBarContent, props.textClassName)}>
                            { props.children }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}