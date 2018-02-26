import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sketch from '../javascript/Visualizer2DSketch'
import '../css/Visualizer2dSketch.css'
class Visualizer2D  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFullScreen:false
		}
	}
	componentDidMount() {
		console.log('new sketch made');
		Sketch();
	}
	changeScreenSize() {
		window.isFullScreen = !this.state.isFullScreen;
		window.controlFunctions.fullScreen(window.isFullScreen);
		this.setState({isFullScreen: !this.state.isFullScreen});
	}
	resetSketch() {
		window.controlFunctions.reset();
	}
	render() {
		let fullScreen = this.state.isFullScreen ? (<i className="fas fa-window-close"></i>) : (<i className="fas fa-expand-arrows-alt"></i>);
		return (
			<div className="Visualizer2D" id="Visualizer2D">
				<div className="page-controls" isfullscreen={this.state.isFullScreen.toString()}>
					<div
						id="fullscreen-btn"
						className="btn-fullScreen"
						onClick={() => this.changeScreenSize()}
					>
						<label>FullScreen: </label>
						{fullScreen}
					</div>
					<div
						className="btn-reset"
						onClick={() => this.resetSketch()}
					>
						<label>Reset:</label>
						<i className="fas fa-redo"></i>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state
}
const mapDispatchToProps = (dispatch) => {
	return {
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps)(Visualizer2D);