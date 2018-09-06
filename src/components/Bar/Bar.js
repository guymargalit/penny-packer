import React, { Component } from 'react';
import { Bar as BarChartJS } from 'react-chartjs-2';
import { data } from './data';
import './Bar.css';

export default class Bar extends Component {
	render() {
		return (
			<div className="Bar">
				<div className="Bar-container">
					<BarChartJS
						data={data}
						height={400}
						options={{
							maintainAspectRatio: false,
						}}
					/>
				</div>
			</div>
		);
	}
}
