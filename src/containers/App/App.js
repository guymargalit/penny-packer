import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home';
import Header from '../../components/Header';
import './App.css';

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</div>
		);
	}
}
