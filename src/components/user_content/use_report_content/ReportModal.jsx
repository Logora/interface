import React, { useState } from 'react';
import { Modal, useModal } from '@logora/debate.dialog.modal';
import { useIntl } from 'react-intl';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { Select } from '@logora/debate.input.select';
import { Loader } from '@logora/debate.progress.loader';
import { Button } from '@logora/debate.action.button';
import cx from 'classnames';
import styles from './ReportModal.module.scss';

export const ReportModal = (props) => {
    const [step, setStep] = useState('SUBMIT');
    const [reportDescription, setReportDescription] = useState("");
    const [reportType, setReportType] = useState(null);
    const intl = useIntl();
    const { hideModal } = useModal();
    const dataProvider = useDataProvider();

    const handleReportSubmit = (event) => {
        event.preventDefault();
        const data = {
            reportable_id: props.reportableId,
            reportable_type: props.reportableType,
            classification: reportType,
            description: reportDescription,
        };
        setStep('LOADING');
        dataProvider.create("reports", data).then(response => {
            setStep('SUCCESS');
        }, error => {
            setStep('SUCCESS');
        });
    }

    return (
        <div>
            <Modal data-vid={"report_modal"} title={props.title || intl.formatMessage({ id: "report.report_modal.title", defaultMessage: "Report content" })}>
                <div className={cx(styles.reportModalBody)}>
                    {
                        {
                           'SUBMIT':
                                <form onSubmit={handleReportSubmit} className={styles.reportForm}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="reportType">
                                            { intl.formatMessage({ id: "report.report_modal.type_input_label", defaultMessage: "Report type" }) }
                                        </label>
                                        <Select 
                                            onChange={e => setReportType(e.value)}
                                            options={
                                                [
                                                    { name: "ATTACK_ON_DEBATER", value: "ATTACK_ON_DEBATER", text: intl.formatMessage({ id:"report.report_modal.attack_on_debater_option", defaultMessage: "Attack on fellow debater"}) },
                                                    { name: "ATTACK_ON_AUTHOR", value: "ATTACK_ON_AUTHOR", text: intl.formatMessage({ id:"report.report_modal.attack_on_author_option", defaultMessage: "Attack on journalist or on moderation"}) },
                                                    { name: "INCOHERENT", value: "INCOHERENT", text: intl.formatMessage({ id:"report.report_modal.incoherent_option", defaultMessage: "Incoherent" }) },
                                                    { name: "HATE_SPEECH", value: "HATE_SPEECH", text: intl.formatMessage({ id:"report.report_modal.hate_speech_option", defaultMessage: "Hate speech : Intending to provoke or inflame."}) },
                                                    { name: "OBSCENE", value: "OBSCENE", text: intl.formatMessage({ id:"report.report_modal.obscene_option", defaultMessage: "Obscene : Obscene or vulgar language such as cursing."}) },
                                                    { name: "SPAM", value: "SPAM", text: intl.formatMessage({ id:"report.report_modal.spam_option", defaultMessage: "Spam : Irrelevant or unsolicited commercial content."}) },
                                                    { name: "UNSUBSTANTIAL", value: "UNSUBSTANTIAL", text: intl.formatMessage({ id:"report.report_modal.unsubstantial_option", defaultMessage: "Unsubstantial : Trivial or short"}) },
                                                    { name: "REPETITION", value: "REPETITION", text: intl.formatMessage({ id:"report.report_modal.repetition_option", defaultMessage: "Repetition"}) },
                                                ]
                                            }
                                            className={styles.select}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="reportDescription">
                                            { intl.formatMessage({ id: "report.report_modal.description_input_label", defaultMessage: "Tell us more about your report" }) }
                                        </label>
                                        <textarea
                                            className={styles.formControl} 
                                            id="reportDescription"
                                            role='textbox'
                                            rows={4}
                                            value={reportDescription}
                                            onChange={e => setReportDescription(e.target.value)}
                                            placeholder={intl.formatMessage({ id:"report.report_modal.description_input_placeholder", defaultMessage: "Tell us more" }) }
                                        ></textarea>
                                   </div>
                                   <div className={cx(styles.formGroup, styles.reportFormSubmit)}>
                                        <Button handleClick={() => null} data-tid={"action_submit_report"} type="submit">
                                            { intl.formatMessage({ id: "report.report_modal.submit_label", defaultMessage: "Send" }) }
                                        </Button>
                                   </div>
                                </form>,
                           'LOADING': <Loader />,
                           'SUCCESS':
                               <div>
                                    <div className={styles.successText}>
                                        { intl.formatMessage({ id: "report.report_modal.success", defaultMessage: "Thank you for your submission !" }) }
                                    </div>
                                    <div className={styles.successButtonBox}>
                                        <Button handleClick={hideModal}>
                                            { intl.formatMessage({ id: "report.report_modal.close", defaultMessage: "Close" }) }
                                        </Button>
                                    </div>
                               </div>
                        }[step]
                    }
                </div>
            </Modal>
        </div>
    );
}