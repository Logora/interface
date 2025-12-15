import React, { useState, useEffect } from "react";
import { Argument } from "@logora/debate.argument.argument";
import { SuggestionBox } from "@logora/debate.suggestion.suggestion_box";
import { ProposalBox } from "@logora/debate.proposal.proposal_box";
import { useIntl } from "react-intl";
import { Icon } from '@logora/debate.icons.icon';
import cx from "classnames";
import styles from './ReportBox.module.scss';


export const ReportBox = ({ report, flash }) => {
  const intl = useIntl();
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (flash === report.id) {
      const reportElement = document.getElementById(`reports_${report.id}`);
      if (reportElement) {
        reportElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setIsFlashing(true);
    } else {
      setIsFlashing(false);
    }
  }, [flash, report.id]);

  const renderReportContent = () => {
    const { reportable_type, reportable } = report;
    switch (reportable_type) {
      case "Message": {
        const shouldHideContent =
          report.is_processed === true && report.reportable?.status === "rejected";
      
        return (
          <Argument
            argument={reportable}
            positions={reportable.group?.group_context?.positions?.slice(0, 2) || []}
            hideReplies={true}
            hideFooter={true}
            showModerationFeedback={false}
            hideContent={shouldHideContent}
          />
        );
      }
      
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
          <div className={styles.statusMessage} data-testid="report-status-message">
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
    <div id={`reports_${report.id}`} className={cx(styles.reportBox, { [styles.reportHighlighted]: isFlashing })}>
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
                {intl.messages[`report.content_header.moderation_reason.${report.classification.toLowerCase()}`]
                  ? intl.formatMessage({
                    id: `report.content_header.moderation_reason.${report.classification.toLowerCase()}`,
                    defaultMessage: report.classification
                  })
                  : report.classification}
              </div>
            )}
            {renderStatusMessage(report.is_processed, report.reportable?.status)}
          </div>
          {renderReportContent()}
        </div>
      )}
    </div>
  );
};

export default ReportBox;