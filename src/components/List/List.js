import React, { Component } from 'react';
import Item from './Item';
import './List.css';

export default class List extends Component {
	render() {
		return (
			<div className="List">
				<div className="List-container">
					<Item />
				</div>
			</div>
		);
	}
}
