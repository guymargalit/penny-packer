import React, { Component } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import './Home.css';

export default class Home extends Component {
	state = {
		income: 82000,
		pretax: 18500,
		expenses: 0,
		year: 2018,
		filing_status: 'single',
		state_code: 'CA',
	};

	calculateTaxes(payrate) {
		const body = {
			pay_rate: payrate,
			filing_status: this.state.filing_status,
			state: this.state.state_code,
		};
		try {
			fetch('https://taxee.io/api/v2/calculate/' + this.state.year, {
				method: 'POST',
				headers: {
					Authorization:
						'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjViOGIyYmY4OGZlNjMzMTVhMzA5MGQ5MiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTUzNTg0NzQxNn0.I5GPrVEtAHvs-oqyJv230hn-kbqhWFVPrHc3qjhVKBQ',
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: body,
			})
				.then(response => response.json())
				.then(responseJson => {
					console.log(responseJson);
				});
		} catch (error) {
			console.log(error);
		}
	}

	colorScale = e => {
		if (e > 3000) {
			return 'rgba(113, 184, 142, 1)';
		} else if (e > 0) {
			return 'rgba(113, 184, 142, 1)';
		} else if (e < -3000) {
			return 'rgba(216, 129, 119, 1)';
		} else if (e < 0) {
			return 'rgba(235, 192, 187, 1)';
		} else {
			return '#ffffff';
		}
	};

	render() {
		let { income, pretax, expenses } = this.state;
		let payrate = income - pretax;
		let surdef = payrate - expenses;
		return (
			<div className="Home">
				<p>
					Become a wealthy American industrialist and start your own gold mine in the remote mountains of
					Peru.
				</p>
				<div className="Home-form">
					<p>Total Income</p>
					<input
						className="Home-input"
						value={income}
						onChange={e => this.setState({ income: e.target.value })}
						type="number"
						placeholder="Total Income"
					/>
					<p>401k Pretax</p>
					<input
						className="Home-input"
						value={pretax}
						onChange={e => this.setState({ pretax: e.target.value })}
						type="number"
						placeholder="Pretax"
					/>
					<p>Expenses</p>
					<input
						className="Home-input"
						value={expenses}
						onChange={e => this.setState({ expenses: e.target.value })}
						type="number"
						placeholder="Pretax"
					/>
					<button onClick={payrate => this.calculateTaxes(payrate)}>calculate taxes</button>
				</div>
				<div className="Home-intro">
					<div className="Home-chart">
						<Bar
							className="Home-chart"
							data={{
								labels: [''],
								datasets: [
									{
										label: 'Pretax - 401k',
										backgroundColor: '#FF6384',
										borderColor: '#FF6384',
										borderWidth: 1,
										data: [income - pretax],
									},
									{
										label: '401k',
										backgroundColor: '#36A2EB',
										borderColor: '#36A2EB',
										borderWidth: 1,
										data: [pretax],
									},
								],
							}}
							width={200}
							height={250}
							options={{
								scales: {
									xAxes: [
										{
											stacked: true,
										},
									],
									yAxes: [
										{
											stacked: true,
											ticks: {
												callback: function(value, index, values) {
													if (parseInt(value) >= 1000) {
														return (
															'$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
														);
													} else {
														return '$' + value;
													}
												},
											},
										},
									],
								},
								tooltips: {
									callbacks: {
										label: function(t, d) {
											var xLabel = d.datasets[t.datasetIndex].label;
											var yLabel =
												t.yLabel >= 1000
													? '$' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
													: '$' + t.yLabel;
											return xLabel + ': ' + yLabel;
										},
									},
								},
							}}
						/>
					</div>
					<div className="Home-chart">
						<Bar
							data={{
								labels: ['Expenses'],
								datasets: [
									{
										label: 'Surplus / Defecit',
										backgroundColor: this.colorScale(surdef),
										borderWidth: 1,
										data: [surdef],
									},
								],
							}}
							width={200}
							height={250}
							options={{
								scales: {
									yAxes: [
										{
											ticks: {
												beginAtZero: true,
												callback: function(value, index, values) {
													if (parseInt(value) >= 1000) {
														return (
															'$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
														);
													} else {
														return '$' + value;
													}
												},
											},
										},
									],
								},
								tooltips: {
									callbacks: {
										label: function(t, d) {
											var xLabel = d.datasets[t.datasetIndex].label;
											var yLabel =
												t.yLabel >= 1000
													? '$' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
													: '$' + t.yLabel;
											return xLabel + ': ' + yLabel;
										},
									},
								},
							}}
						/>
					</div>
					<div className="Home-chart">
						<Doughnut
							width={200}
							height={230}
							data={{
								labels: ['Needs', 'Savings', 'Wants'],
								datasets: [
									{
										data: [48.2, 17.2, 34.6],
										backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
										hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
									},
								],
							}}
							options={{
								tooltips: {
									callbacks: {
										label: function(tooltipItem, data) {
											//get the concerned dataset
											var dataset = data.datasets[tooltipItem.datasetIndex];
											//calculate the total of this data set
											var total = dataset.data.reduce(function(
												previousValue,
												currentValue,
												currentIndex,
												array
											) {
												return previousValue + currentValue;
											});
											//get the current items value
											var currentValue = dataset.data[tooltipItem.index];
											//calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
											var percentage = Math.floor((currentValue / total) * 100 + 0.5);

											return percentage + '%';
										},
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}
