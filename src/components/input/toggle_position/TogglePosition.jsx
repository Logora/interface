import React, { useState, useEffect } from 'react';
import { TranslatedContent } from '@logora/debate/translation/translated_content';
import styles from './TogglePosition.module.scss';
import cx from "classnames";

export const TogglePosition = ({ activeLabel, firstLabel, firstLabelClassName = styles.firstLabelDefault, secondLabel, secondLabelClassName = styles.secondLabelDefault, onChange }) => {
    const [activatedLabel, setActivatedLabel] = useState(activeLabel);

    useEffect(() => {
        setActivatedLabel(activeLabel)
    }, [activeLabel])

    const labelChoice = (labelIndex) => {
        setActivatedLabel(labelIndex);
        onChange(labelIndex);
    }

    return (
        <div className={styles.container}>
            <div data-testid={"firstLabel"} onClick={() => labelChoice(0)} className={cx(styles.label, { [styles.labelActive]: activatedLabel === 0, [firstLabelClassName]: activatedLabel === 0 })}>
                <TranslatedContent
                    originalContent={firstLabel.name}
                    originalLanguage={firstLabel.language}
                    targetField={"name"}
                    translations={firstLabel.translation_entries}
                />
            </div>
            <div data-testid={"secondLabel"} onClick={() => labelChoice(1)} className={cx(styles.label, { [styles.labelActive]: activatedLabel === 1, [secondLabelClassName]: activatedLabel === 1 })}>
                <TranslatedContent
                    originalContent={secondLabel.name}
                    originalLanguage={secondLabel.language}
                    targetField={"name"}
                    translations={secondLabel.translation_entries}
                />

            </div>
        </div>
    )
}

