import React, {Component} from 'react';

class View  extends React.Component {
	constructor(props) {
		super(props);
	}
	get className() { //default value - view
		if(this.props.className === undefined) {
			return 'view';
		}
		return this.props.className;
	}
	get id() { //default value - undefined
		if(this.props.id === undefined) {
			return undefined;
		}
		return this.props.id;
	}
	get position() { //default value - absolute
		if(this.props.position === undefined) {
			return 'absolute';
		}
		return this.props.position;
	}
	get left() { //default value - 0
		if(this.props.left === undefined) {
			return 0;
		}
		return this.props.left;
	}
	get right() { //default value - 0
		if(this.props.right === undefined) {
			return 0;
		}
		return this.props.right;
	}
	get top() { //default value - 0
		if(this.props.top === undefined) {
			return 0;
		}
		return this.props.top;
	}
	get bottom() { //default value - 0
		if(this.props.bottom === undefined) {
			return 0;
		}
		return this.props.bottom;
	}
	get padding() { //default value - 0
		if(this.props.padding === undefined) {
			return 0;
		}
		return this.props.padding;
	}
	get margin() { //default value - 0
		if(this.props.margin === undefined) {
			return 0;
		}
		return this.props.margin;
	}

	get style() {
		const style = {
			position: this.position,
			left: this.left,
			right: this.right,
			top: this.top,
			bottom: this.bottom,
			backgroundColor: this.backgroundColor,
			padding: this.padding,
			margin: this.margin,
		};
		return style
	}
	get backgroundColor() { //default value - ''
		if(this.props.backgroundColor === undefined) {
			return '';
		}
		return this.props.backgroundColor;
	}



	render() {
		return (
			<div className={this.className}
			     id={this.id}
			     style={this.props.style === undefined ? this.style : this.props.style}
			     onMouseMove={this.props.onMouseMove}
			     onMouseDown={this.props.onMouseDown}
			     onMouseUp={this.props.onMouseUp}
			>
				{this.props.children}
			</div>
		);
	}
}

export default View;