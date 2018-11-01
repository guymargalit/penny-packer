import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { data } from '../../data';
import Home from '../Home';
import Header from '../../components/Header';
import './App.css';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			recentData: data,
		};
	}

	updateData = e => {
		let dataset = this.state.recentData;
		dataset.datasets[0].data[0] = e;
		this.setState({ recentData: dataset });
	};

	render() {
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route
						exact
						path="/"
						render={() => <Home updateData={this.updateData} recentData={this.state.recentData} />}
					/>
				</Switch>
			</div>
		);
	}
}
