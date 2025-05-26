import React from "react";
import { Argument } from "@logora/debate.argument.argument";
import { SuggestionBox } from "@logora/debate.suggestion.suggestion_box";
import { ProposalBox } from "@logora/debate.proposal.proposal_box";
import { useIntl } from "react-intl";
import { Icon } from '@logora/debate.icons.icon';
import styles from './ReportBox.module.scss';

export const ReportBox = ({ report }) => {
  const intl = useIntl();

  const renderReportContent = (report) => {
    const { reportable_type, reportable } = report;

    switch (reportable_type) {
      case "Message":
        return <Argument argument={reportable} hideReplies={true} hideFooter={true} hideModerationReason={true} />;
      case "Proposal":
        return <ProposalBox proposal={reportable} hideFooter={true} />;
      case "Group":
        return <SuggestionBox suggestion={reportable} hideFooter={true} />;
      default:
        return (
          <div>
            {intl.formatMessage({
              id: "report.unknown_type",
              defaultMessage: "Unknown content type"
            })}
          </div>
        );
    }
  };

  const renderStatusMessage = (status) => {
    switch (status) {
      case "accepted":
        return (
          <div className={styles.statusMessage}>
            {intl.formatMessage({
              id: "report.content_header.status_accepted",
              defaultMessage: "Thank you for your report. After verification, the content has been removed."
            })}
          </div>
        );
      case "rejected":
        return (
          <div className={styles.statusMessage}>
            {intl.formatMessage({
              id: "report.content_header.status_rejected",
              defaultMessage: "Thank you for your report. After verification, we have not removed the content."
            })}
          </div>
        );
      default:
        return null;
    }
  };

  const renderPendingMessage = () => (
    <div className={styles.statusMessage}>
      {intl.formatMessage({
        id: "report.content_header.status_pending",
        defaultMessage: "Thank you for your report. The content is pending."
      })}
    </div>
  );

  return (
    <div className={styles.reportBox}>
      {report && (
        <div className={styles.reportItem}>
          <div className={styles.reportHeader}>
            {report.classification && (
              <div className={styles.reportReason}>
                <Icon name="announcement" width={18} height={18} className={styles.warningIcon} />
                {intl.formatMessage({
                  id: "report.content_header.moderation_reason",
                  defaultMessage: "Report reason:"
                })}{" "}
                {intl.messages[`user_content.content_header.moderation_reason.${report.classification.toLowerCase()}`]
                  ? intl.formatMessage({
                      id: `user_content.content_header.moderation_reason.${report.classification.toLowerCase()}`,
                      defaultMessage: report.classification
                    })
                  : report.classification}
              </div>
            )}

            {report.is_processed
              ? renderStatusMessage(report.reportable?.status)
              : renderPendingMessage()
            }
          </div>
          {renderReportContent(report)}
        </div>
      )}
    </div>
  );
};

export default ReportBox;
