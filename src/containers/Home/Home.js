import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let updateData = this.props.updateData;
		return (
			<div className="Home">
				<h1>test: {this.props.recentData.datasets[0].data[0]}</h1>
				<p>Total Income</p>
				<input
					className="Home-input"
					value={this.props.recentData.datasets[0].data[0]}
					onChange={e => updateData(e)}
					type="number"
					placeholder="Total Income"
				/>
				{/* <Pie data={this.props.data} /> */}
				<Bar
					data={this.props.recentData}
					redraw={true}
					options={{
						responsive: true,
					}}
				/>
			</div>
		);
	}
}
