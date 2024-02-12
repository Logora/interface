import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { Loader } from '@logora/debate.progress.loader';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from "./PieChart.module.scss";
import StandardErrorBoundary from "@logora/debate.error.standard_error_boundary";
import PropTypes from 'prop-types';

const DEFAULT_COLORS = ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(255, 143, 102, 0.8)', 'rgba(93, 82, 179, 0.8)']

export const PieChart = ({ data, labels, totalItemsCount, pieTitle, colors, minPercentageValue = 0.75 }) => {
	const intl = useIntl();
	const [pieChartData, setPieChartData] = useState(undefined);
	const [maxValue, setMaxValue] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (data != undefined) {
			formatPieChartData(data);
			setMaxValue(data.length);
		}
	}, [data])

	const formatPieChartData = (data) => {
		const negligibleDimensions = data.filter(item => Math.round((100*item.value)/totalItemsCount) <= (maxValue * minPercentageValue)) 
		const otherDimensions = { dimension: "others", value: negligibleDimensions.reduce((a, b) => a + b.value, 0) }
		let finalArr = data.filter(e => !negligibleDimensions.includes(e));
		if (negligibleDimensions.reduce((a, b) => a + b.value, 0) > 0) { finalArr.push(otherDimensions); }
				
		let finalData = {
			labels: finalArr.map(elm => labels.filter(tag => tag.id == elm.dimension)[0] ? `${labels.filter(tag => tag.id == elm.dimension)[0].name} (${Math.round((100*elm.value)/totalItemsCount)} %)` : intl.formatMessage({ id: "consultation.synthesis.others", defaultMessage: "Others" })), // Find correct name associated with label
			datasets: [
				{
					data: finalArr.map(elm => Math.round((100*elm.value)/totalItemsCount)),
					backgroundColor: colors || DEFAULT_COLORS,
					borderWidth: 1,
				},
			],
		};
		
		setPieChartData(finalData);
		setIsLoading(false);
	}

	const options = {
		responsive: true, 
		maintainAspectRatio: false,
		plugins: {
			datalabels: {
				display: true,
				color: "white",
				font: { size: "16" },
				formatter: function (value) {
					if(value >= maxValue)
						return value + " %"
					else {
						return " ";
					}
				}
			},
			title: {
				display: true,
				font: { size: "16" },
				text: pieTitle
			},
			tooltip: {
				callbacks: {
					label: function(value) { return ` ${value.label}`; }
				}
			}
		}
	}

	return (
		<StandardErrorBoundary>
			{ isLoading ?
				<Loader/>
			:
				<div className={styles.pieChart} data-testid="pieChartCanvas">
					<Pie data={pieChartData} options={options} />
				</div>
			}
		</StandardErrorBoundary>
	)
}

PieChart.propTypes = {
	/** Array containing label, contentColor and data */
	data: PropTypes.array,
	/** Array of objects containing the labels */
	labels: PropTypes.array,
	/** The number of data items */
	totalItemsCount: PropTypes.number,
	/** Title for the pie chart */
	pieTitle: PropTypes.string,
	/** Array of colors overriding the default colors */
	colors: PropTypes.array,
	/** Discrimining percentage value under which the elements will be labelized as "Other" */
	minPercentageValue: PropTypes.number
};