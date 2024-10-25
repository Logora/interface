import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Select } from '@logora/debate.input.select';
import { Tag } from '@logora/debate.tag.tag';
import { Icon } from '@logora/debate.icons.icon'
import { Loader } from '@logora/debate.progress.loader';
import styles from "./LineChart.module.scss";
import StandardErrorBoundary from "@logora/debate.error.standard_error_boundary";
import cx from 'classnames';
import PropTypes from 'prop-types';

export const LineChart = ({ data, labels, onFilterChange, title, className, filterOptions }) => {
  const intl = useIntl();
  
  const CHART_OPTIONS = {
    responsive: true, 
    maintainAspectRatio: false, 
    plugins: { title: { display: true, font: { size: "16" }, text: title}, legend: { position: "top", align: "center" } }, 
    scales: { y: { beginAtZero: true, grid: { drawOnChartArea: true, color: "#f1f1f1" } }, x: { grid: { drawOnChartArea: false } } } 
  };
  
	const [isLoading, setIsLoading] = useState(true);
  const [metric, setMetric] = useState(filterOptions[0].value);
  const [activeTagId, setActiveTagId] = useState(null);
  const [lineChartData, setLineChartData] = useState();

  useEffect(() => {
    onFilterChange(metric, activeTagId);
  }, [activeTagId])

  useEffect(() => {
    if (data != undefined && data.length > 0) {
      formatLineChartData(data);
    }
  }, [data])

  const onSetMetric = (value) => {
    setMetric(value);
    onFilterChange(value, activeTagId);
  }

  const formatLineChartData = (data) => {
    let finalData = {
      labels: data[0].data.map(elm => elm.dimension.split("-").reverse().join("-")).map((elm, index) => index % 3 === 0 ? elm : ""),
      datasets: data.map(dataset => { 
        return {
            label: dataset.label,
            data: dataset.data.map(elm => elm.value),
            fill: false,
            borderColor: dataset.contentColor,
            backgroundColor: `${dataset.contentColor}88`,
            tension: 0.2
        };
      })
    }
    setLineChartData(finalData);
    setIsLoading(false);
  }

  const displayTags = (tag) => {
    const tagIsActive = activeTagId === tag.id;

    return (
      <div className={styles.tagItem} key={tag.id} onClick={() => setActiveTagId(tag.id == activeTagId ? null : tag.id)}>
        <Tag text={tag.display_name || tag.name}  active={tagIsActive} rightIcon={tagIsActive && <Icon name="close" height={10} width={10} />} />
      </div>
    );
  }

  return (
    <StandardErrorBoundary>
      <div className={cx(styles.lineChartContainer, className)}>
        <div className={styles.lineChartFilterOptions}>
          <Select options={filterOptions} onChange={(selectedObject) => onSetMetric(selectedObject.value)} />
          { labels && 
            <div className={styles.filterTagList}>
              {[{id: null , display_name: intl.formatMessage({ id: "info.all" }), name: "aaa"}, ...labels].sort((a, b) => {return (a['name'].localeCompare(b['name'], 'fr', {ignorePunctuation: true}))}).map(displayTags)}
            </div>}
        </div>
        { isLoading ?
            <Loader/>
          :
            <div className={styles.lineChartWrapper}>
              <Line data={lineChartData} options={CHART_OPTIONS} />
            </div>
        }
      </div>
    </StandardErrorBoundary>
  )
}

LineChart.propTypes = {
	/** Array containing label, contentColor and data */
	data: PropTypes.array,
	/** Array of objects containing the labels */
	labels: PropTypes.array,
	/** Callback function used to filter data */
	onFilterChange: PropTypes.func,
	/** Title for the chart */
	title: PropTypes.string,
	/** Extra classname for the chart container */
	className: PropTypes.string,
	/** Array of filters */
	filterOptions: PropTypes.array
};