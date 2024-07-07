import React from 'react';
import cx from 'classnames';
import styles from './ProgressBar.module.scss';
import PropTypes from "prop-types";

export const ProgressBar = ({ goal, progress, title, showPercentageSubtitle = false, showProgressSubtitle = false, barFull = false, progressUnit, className, innerClassName, subtitleClassName, children }) => {
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
            <div className={cx(styles.progressBarContainer, className)} role="progress">
                <div className={styles.currentProgressBar} style={{width: (percentage >= 100 || barFull) ? "100%" : percentage + "%"}} role="progressbar" aria-valuemin="0" aria-valuenow={(percentage >= 100 || barFull) ? 100 : percentage} aria-valuemax={"100"}>
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

ProgressBar.propTypes = {
    /** Current progress */
    progress: PropTypes.number.isRequired,
    /** Progress goal */
    goal: PropTypes.number.isRequired,
    /** Title displayed above the progress bar on the left */
    title: PropTypes.string,
    /** Progress unit that will be shown in progress subtitle */
    progressUnit: PropTypes.string,
    /** Class name passed to progress bar container */
    showPercentageSubtitle: PropTypes.bool,
    /** Display a text container with information about progress */
    showProgressSubtitle: PropTypes.bool,
    /** If true, will show full bar and only show progress in subtitle */
    barFull: PropTypes.bool,
    /** Class name passed to progress bar container */
    className: PropTypes.string,
    /** Class name passed to progress bar */
    innerClassName: PropTypes.string,
    /** Class name passed to the subtitle */
    subtitleClassName: PropTypes.string,
	/**  Content of the link if icon is empty*/
	children: PropTypes.node
};
