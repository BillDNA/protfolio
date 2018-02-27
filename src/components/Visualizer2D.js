import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sketch from '../javascript/Visualizer2DSketch'
import '../css/Visualizer2dSketch.css'
class Visualizer2D  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isFullScreen:false,
			showingControls: true
		}
	}
	hideControls() {
		this.setState({showingControls: !this.state.showingControls});
	}
	componentDidMount() {
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
		const fullScreen = this.state.isFullScreen ? (<i className="fas fa-window-close"></i>) : (<i className="fas fa-expand-arrows-alt"></i>);
		const showControls = this.state.showingControls ? (<i class="fas fa-eye-slash"></i>) : (<i class="fas fa-eye"></i>);
		const conrtolsToolTip = this.state.showingControls ? "Hide controls" : "Show controls";
		return (
			<div className="Visualizer2D" id="Visualizer2D">
				<div className="page-controls"
				     isfullscreen={this.state.isFullScreen.toString()}
				     showControls={this.state.showingControls.toString()}>
					<div className="control-section colors-control">
						<div className="colors-control-title">Colors</div>
						<div className="color-freq-tabs">
							<div className="color-freq-tab base-tab">Base</div>
							<div className="color-freq-tab low-mid-tab">Low Mid</div>
							<div className="color-freq-tab mid-tab">Mid</div>
							<div className="color-freq-tab high-mid">High Mid</div>
							<div className="color-freq-tab treble">Treble</div>
						</div>
						<div className="color-controls">
							<div className='color-slider'>
								<input type='range' min='0' max='0'/>
							</div>
						</div>
					</div>
					<div className="control-section">
						<div className="full-screen-control control-item"
						    onClick={() => this.changeScreenSize()}
						     data-tooltip="Full screen"
						>
							{fullScreen}
						</div>
						<div className="reset-control control-item"
						    onClick={() => this.resetSketch()}
						     data-tooltip="Rest"
						>
							<i className="fas fa-redo"></i>
						</div>
						<div className="hide-control control-item"
						     data-tooltip={conrtolsToolTip}
						     onClick={() => this.hideControls()}
						>
							{showControls}
						</div>
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