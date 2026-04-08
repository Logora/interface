import React from 'react';
import { useIntl } from "react-intl";
import cx from 'classnames';
import styles from './ProgressBar.module.scss';

export const ProgressBar = ({ goal, progress, title, showPercentageSubtitle = false, showProgressSubtitle = false, barFull = false, progressUnit, className, innerClassName, subtitleClassName, children }) => {
    const intl = useIntl();
    const percentage = Number((((goal === 0 ? 0 : (progress || 0)) / (goal === 0 ? 1 : goal)) * 100).toFixed(1));

    return (
        <div className={styles.progressContainer}>
            <div className={styles.titleContainer}>
                { title &&
                    <div className={styles.title}>
                        { title }
                    </div>
                }
                { showProgressSubtitle &&
                    <div className={cx(styles.subtitleContainer, subtitleClassName)}>
                        { barFull ?
                            <span className={styles.progressSubtitle}>
                                {`${progress} ${progressUnit || ""}`}
                            </span> 
                        :
                            <span className={styles.progressSubtitle}>
                                {`${progress || 0} / ${goal} ${progressUnit || ""} (${percentage}%)`}
                            </span>
                        }
                    </div>
                }
                { showPercentageSubtitle &&
                    <div className={cx(styles.subtitleContainer, subtitleClassName)}>
                        <span>{`${percentage}%`}</span>
                    </div>
                }
            </div>
            <div className={cx(styles.progressBarContainer, className)}>
                <div className={styles.currentProgressBar} style={{width: (percentage >= 100 || barFull) ? "100%" : percentage + "%"}} role="progressbar" aria-valuemin="0" aria-valuenow={(percentage >= 100 || barFull) ? 100 : percentage} aria-valuemax={"100"} aria-label={intl.formatMessage({ id: "progress.progress_bar.aria_label", defaultMessage: "Progress bar" })}
                >
                    <div className={cx(styles.progressBar, innerClassName)}>
                        <div className={styles.progressBarContent}>
                            { children }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

