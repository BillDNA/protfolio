import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import Sketch from '../javascript/Visualizer2DSketch'
class Visualizer2D  extends React.Component {
	render() {
		return (
			<div className="Visualizer2D">
				<P5Wrapper sketch={Sketch} />
			</div>
		);
	}
}

export default Visualizer2D;