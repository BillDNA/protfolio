import React, { Component } from 'react';
import View from './View';

class SliderInput  extends View {
	constructor(props){
		super(props);
		this.state = {
			value: this.props.defaultValue !== undefined ? this.props.defaultValue : 128,
			previewValue: this.props.defaultValue !== undefined ? this.props.defaultValue : 128,
			mouseDown: false,
		}
	}
	get className() { //default value - slider-input
		if(this.props.className === undefined) {
			return super.className + ' slider-input';
		}
		return super.className + ' slider-input '+this.props.className;
	}
	get min() {
		if(this.props.min === undefined) {
			return 0;
		}
		return this.props.min;
	}
	get max() {
		if(this.props.max === undefined) {
			return 256;
		}
		return this.props.max;
	}
	get step() {
		if(this.props.max === undefined) {
			return 256;
		}
		return this.props.max;
	}
	get step() { //default value - 1
		if (this.props.step === undefined) {
			return 1;
		}
		return this.props.step;
	}
	get defaultValue() { //default value - 0
		if(this.props.defaultValue === undefined) {
			return 128;
		}
		return this.props.defaultValue;
	}
	get style() {
		let style = super.style;
		style = {... style,

		};
		return style;
	}
	get width() { //default value - ‘100%'
		if(this.props.width === undefined) {
			return '100%';
		}
		return this.props.width+'%';
	}
	onChange(element) {
		if(this.props.onChange !== undefined) {
			this.props.onChange(element.target.value);
		}
	}
	get indicatorColor() { //default value - white
		if(this.props.indicatorColor === undefined) {
			return 'white';
		}
		return this.props.indicatorColor;
	}
	get fillColor() { //default value - green
		if(this.props.fillColor === undefined) {
			return 'green';
		}
		return this.props.fillColor;
	}
	get remainingColor() { //default value - lightgray
		if(this.props.remainingColor === undefined) {
			return 'lightgray';
		}
		return this.props.remainingColor;
	}
	get percentValue() {
		return (this.state.value-this.min) / this.max;
	}
	get percentPreviewValue() {
		return (this.state.previewValue-this.min) / this.max;
	}
	_mouseMoveHelper(event) {
		let bounds = event.target.getBoundingClientRect();
		if(event.target.parentNode.className.includes('slider-input')) {
			bounds = event.target.parentNode.getBoundingClientRect()
		}
		const w = bounds.width-this.padding*2;
		const mouseX = (event.clientX-bounds.left-this.padding);
		const percent = Math.min(1,Math.max(mouseX/w,0));
		let roughValue = percent * (this.max - this.min) + this.min;
		roughValue = Math.max(this.min,Math.min(this.max,roughValue));
		return roughValue;
	}
	onMouseUp(event) {
		let roughValue = this._mouseMoveHelper(event);
		const remainder = (roughValue-this.min) % this.step;
		if(remainder < 0.5 * this.step) {
			roughValue = roughValue - remainder;
		} else {
			roughValue = roughValue - remainder + this.step;
		}
		if(this.props.onChange !== undefined) {
			this.props.onChange(roughValue);
		}
		this.setState({
			value: roughValue,
			mouseDown: false});
	}
	onMouseMove(event) {
		let roughValue = this._mouseMoveHelper(event);
		this.setState({previewValue:roughValue})
	}
	onMouseDown(event) {
		this.setState({mouseDown:true})
	}
	render() {
		const indicatorStyle = {
			backgroundColor: this.indicatorColor,
			width: '10px',
			height: '80%',
			top: '10%',
			left: `calc(${100*this.percentValue}% + ${(0.5 - this.percentValue)*this.padding*2}px)`,
			position:'absolute',
			borderRadius: '4px'
		};
		const fillStyle = {
			backgroundColor: this.fillColor,
			height: '30%',
			top: '35%',
			left: this.padding+'px',
			border: '1px solid black' ,
			right: `calc(${100 - 100*this.percentValue}% + ${(0.5-(1-this.percentValue))*this.padding*2}px)`,
			position:'absolute'
		};
		const remainingStyle = {
			backgroundColor: this.remainingColor,
			right: this.padding+'px',
			left: `calc(${100*this.percentValue}% + ${(0.5 - this.percentValue)*this.padding*2}px )`,
			top: '35%',
			height: '30%',
			position:'absolute'
		};
		let preview;
		if(this.state.mouseDown) {
			const previewStyle = {...indicatorStyle,
				left: `calc(${100*this.percentPreviewValue}% + ${(0.5 - this.percentPreviewValue)*this.padding*2}px)`,
			};
			preview = (
				<div className={'slider-input-preview'} style={previewStyle}>
				</div>);
		}
		return (
			<View className={this.className}
			      style={this.props.style === undefined ? this.style : this.props.style}
			      id={this.id}
			      onMouseMove={this.onMouseMove.bind(this)}
			      onMouseDown={this.onMouseDown.bind(this)}
			      onMouseUp={this.onMouseUp.bind(this)}
			>
				<div className={'slider-input-filled'} style={fillStyle}>
				</div>
				<div className={'slider-input-remaining'} style={remainingStyle}>
				</div>
				<div className={'slider-input-indicator'} style={indicatorStyle}>
				</div>
				{preview}
			</View>
		);
	}
}

export default SliderInput;