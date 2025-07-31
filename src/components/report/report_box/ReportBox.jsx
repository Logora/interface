import React from "react";
import { Argument } from "@logora/debate.argument.argument";
import { SuggestionBox } from "@logora/debate.suggestion.suggestion_box";
import { ProposalBox } from "@logora/debate.proposal.proposal_box";
import { useIntl } from "react-intl";
import { Icon } from '@logora/debate.icons.icon';
import styles from './ReportBox.module.scss';


export const ReportBox = ({ report }) => {
  const intl = useIntl();
  const displayedReport = report;

  const renderReportContent = (report) => {
    const { reportable_type, reportable } = report;
    switch (reportable_type) {
      case "Message":
        return <Argument argument={reportable}  positions={reportable.group?.group_context?.positions?.slice(0, 2) || []} hideReplies={true} hideFooter={true} showModerationFeedback={false} />;
      case "Proposal":
        return <ProposalBox proposal={reportable} hideFooter={true} />;
      case "Group":
        return <SuggestionBox suggestion={reportable} hideFooter={true} />;
      default:
        return <div>{intl.formatMessage({
          id: "report.unknown_type",
          defaultMessage: " Unknown content type"
        })}</div>;
    }
  };

  const renderStatusMessage = (isProcessed, contentStatus) => {
    if (!isProcessed) {
      return (
        <div className={styles.statusMessage}>
          {intl.formatMessage({
            id: "report.content_header.status_pending",
            defaultMessage: "The report is currently in process"
          })}
        </div>
      );
    } else {
      if (contentStatus === "rejected") {
        return (
          <div className={styles.statusMessage}>
            {intl.formatMessage({
              id: "report.content_header.status_rejected",
              defaultMessage: "Thank you for your report. After verification, the content has been removed."
            })}
          </div>
        );
      } else {
        return (
          <div className={styles.statusMessage}>
            {intl.formatMessage({
              id: "report.content_header.status_accepted",
              defaultMessage: "Thank you for your report. After verification, we have not removed the content."
            })}
          </div>
        );
      }
    }
  };

  return (
    <div className={styles.reportBox}>
      {displayedReport && (
        <div className={styles.reportItem}>
          <div className={styles.reportHeader}>
            {displayedReport.classification && (
              <div className={styles.reportReason}>
                <Icon name="announcement" width={18} height={18} className={styles.warningIcon} />
                {intl.formatMessage({
                  id: "report.content_header.moderation_reason",
                  defaultMessage: "Report reason:"
                })}{" "}
                {intl.messages[`user_content.content_header.moderation_reason.${displayedReport.classification.toLowerCase()}`]
                  ? intl.formatMessage({
                    id: `user_content.content_header.moderation_reason.${displayedReport.classification.toLowerCase()}`,
                    defaultMessage: displayedReport.classification
                  })
                  : displayedReport.classification}
              </div>
            )}
            {renderStatusMessage(displayedReport.is_processed, displayedReport.reportable?.status)}
          </div>
          {renderReportContent(displayedReport)}
        </div>
      )}
    </div>
  );
};

export default ReportBox;