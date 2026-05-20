import { SectionBox } from "@logora/debate/section/section_box";
import { SummaryBox } from "@logora/debate/summary/summary_box";
import React from "react";
import { useIntl } from "react-intl";

import styles from "./Summary.module.scss";

export const Summary = ({
  summary,
  tags = [],
  tagClassNames = [],
  title,
  subtitle,
}) => {
  const intl = useIntl();

  const parseSummary = () => {
    if (!summary) return {};

    if (typeof summary === "object") return summary;

    try {
      return JSON.parse(summary);
    } catch {
      return { global: summary };
    }
  };

  const formatSummaryItems = (content) => {
    if (!content) return [];

    return content
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const summaries = parseSummary();

  return (
    <SectionBox
      className={styles.sectionBox}
      isCollapsible
      isCollapsedByDefault={true}
      title={title}
      subtitle={subtitle}
    >
      <div className={styles.content}>
        <div className={styles.description}>
          {intl.formatMessage({
            id: "summary.description.argument_summary",
            defaultMessage:
              "Our algorithm produces comprehensive, well-structured summaries of the most recurrent arguments. Each published argument influences the content of this summary. The better structured the argument, the more weight it carries.",
          })}
        </div>

        <div className={styles.summaryContainer}>
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <div key={tag.id}>
                <SummaryBox
                  summaryItems={formatSummaryItems(summaries[tag.id])}
                  tag={tag.name}
                  tagClassName={tagClassNames[index]}
                  emptySummaryText={intl.formatMessage({
                    id: "info.emptysummary",
                    defaultMessage: "No resume found.",
                  })}
                />
              </div>
            ))
          ) : (
            <SummaryBox
              summaryItems={formatSummaryItems(
                summaries.global || summaries.untagged || Object.values(summaries)[0],
              )}
              emptySummaryText={intl.formatMessage({
                id: "info.emptysummary",
                defaultMessage: "No resume found.",
              })}
            />
          )}
        </div>
      </div>
    </SectionBox>
  );
};