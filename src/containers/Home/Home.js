import React, { Component } from 'react';
import Bar from '../../components/Bar';
import './Home.css';

export default class Home extends Component {
	render() {
		return (
			<div className="Home">
				<div>
					<Bar />
				</div>
			</div>
		);
	}
}
