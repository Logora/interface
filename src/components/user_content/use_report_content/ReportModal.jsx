import React, { useState } from 'react';
import { Modal, useModal } from '@logora/debate.dialog.modal';
import { useIntl } from 'react-intl';
import { useDataProvider } from '@logora/debate.data.data_provider';
import { useAuth } from "@logora/debate.auth.use_auth";
import { Select } from '@logora/debate.input.select';
import { Loader } from '@logora/debate.progress.loader';
import { Button } from '@logora/debate.action.button';
import cx from 'classnames';
import styles from './ReportModal.module.scss';

export const ReportModal = (props) => {
    const [step, setStep] = useState('SUBMIT');
    const [reportDescription, setReportDescription] = useState("");
    const [reportType, setReportType] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const intl = useIntl();
    const { hideModal } = useModal();
    const dataProvider = useDataProvider();
    const [isChecked, setIsChecked] = useState(false);
    const { isLoggedIn } = useAuth();


    const handleReportSubmit = (event) => {
        event.preventDefault();
        const data = {
            reportable_id: props.reportableId,
            reportable_type: props.reportableType,
            classification: reportType,
            description: reportDescription,
            first_name: firstName,
            last_name: lastName,
            email: email
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
                                            {intl.formatMessage({ id: "report.report_modal.type_input_label", defaultMessage: "Report type" })}
                                        </label>
                                        <Select
                                            onChange={e => setReportType(e.value)}
                                            options={
                                                [
                                                    { name: "TOXICITY", value: "TOXICITY", text: intl.formatMessage({ id: "report.report_modal.toxicity_option", defaultMessage: "Incivility" }) },
                                                    { name: "OBSCENE", value: "OBSCENE", text: intl.formatMessage({ id: "report.report_modal.obscene_option", defaultMessage: "Profanity, Sexually explicit, Flirtation, Obscene" }) },
                                                    { name: "HATE_SPEECH", value: "HATE_SPEECH", text: intl.formatMessage({ id: "report.report_modal.hate_speech_option", defaultMessage: "Hate speech or Identity attack" }) },
                                                    { name: "INCOHERENT", value: "INCOHERENT", text: intl.formatMessage({ id: "report.report_modal.incoherent_option", defaultMessage: "Incomprehensibility" }) },
                                                    { name: "SPAM", value: "SPAM", text: intl.formatMessage({ id: "report.report_modal.spam_option", defaultMessage: "Spam : Irrelevant or unsolicited commercial content / Off-topic" }) },
                                                    { name: "UNSUBSTANTIAL", value: "UNSUBSTANTIAL", text: intl.formatMessage({ id: "report.report_modal.unsubstantial_option", defaultMessage: "Unsubstantial : Trivial or short / Repetition" }) },
                                                ]
                                            }
                                            className={styles.select}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="reportDescription">
                                            {intl.formatMessage({ id: "report.report_modal.description_input_label", defaultMessage: "Tell us more about your report" })}
                                        </label>
                                        <textarea
                                            className={styles.formControl}
                                            id="reportDescription"
                                            role='textbox'
                                            rows={4}
                                            value={reportDescription}
                                            onChange={e => setReportDescription(e.target.value)}
                                            placeholder={intl.formatMessage({ id: "report.report_modal.description_input_placeholder", defaultMessage: "Tell us more" })}
                                        ></textarea>
                                    </div>
                                    {props.allowAnonymousUser && !isLoggedIn && (
                                        <>
                                            <div className={cx(styles.formGroup, styles.nameGroup)}>
                                                <div className={styles.nameField}>
                                                    <label htmlFor="firstName">
                                                        {intl.formatMessage({ id: "report.report_modal.first_name_input_label", defaultMessage: "First Name" })}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={styles.formControl}
                                                        id="firstName"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                </div>
                                                <div className={styles.nameField}>
                                                    <label htmlFor="lastName">
                                                        {intl.formatMessage({ id: "report.report_modal.last_name_input_label", defaultMessage: "Last Name" })}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={styles.formControl}
                                                        id="lastName"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="email">
                                                    {intl.formatMessage({ id: "report.report_modal.email_input_label", defaultMessage: "Email" })}
                                                </label>
                                                <input
                                                    type="email"
                                                    className={styles.formControl}
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label className={styles.checkboxLabel}>
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={(e) => setIsChecked(e.target.checked)}
                                                    />
                                                    {intl.formatMessage({
                                                        id: "report.report_modal.declaration",
                                                        defaultMessage: "By submitting this report, I declare that the information provided is, to my knowledge, accurate and complete."
                                                    })}
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    <div className={cx(styles.formGroup, styles.reportFormSubmit)}>
                                        <Button handleClick={() => null} data-tid={"action_submit_report"} type="submit">
                                            {intl.formatMessage({ id: "report.report_modal.submit_label", defaultMessage: "Send" })}
                                        </Button>
                                    </div>
                                </form>,
                            'LOADING': <Loader />,
                            'SUCCESS':
                                <div>
                                    <div className={styles.successText}>
                                        {intl.formatMessage({ id: "report.report_modal.success", defaultMessage: "Thank you for your submission !" })}
                                    </div>
                                    <div className={styles.successButtonBox}>
                                        <Button handleClick={hideModal}>
                                            {intl.formatMessage({ id: "report.report_modal.close", defaultMessage: "Close" })}
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