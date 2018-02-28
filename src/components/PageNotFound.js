import React, { Component } from 'react';
import ColorSelector from './Visualizer2D/Controls/ColorSelector';
import SliderInput from "./UIElements/SliderInput";

class PageNotFound  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			greenColor: 0
		}
	}
	get bgc() {
		return `rgb(255,${this.state.greenColor},0)`
	}

	changeColor(value) {
		this.setState({greenColor:value});
	}
	render() {
		let s = {width: '300px',height: '80px'};
		return (
			<div className="PageNotFound" style={s}>
				404: PAGE NOT FOUND
				<ColorSelector/>
			</div>
		);
	}
}

export default PageNotFound;