import React, { Component } from 'react';
import Sketch from '../javascript/Visualizer2DSketch'
class Visualizer2D  extends React.Component {
	componentDidMount() {
		Sketch();
	}
	render() {
		return (
			<div className="Visualizer2D" id="Visualizer2D">
			</div>
		);
	}
}

export default Visualizer2D;