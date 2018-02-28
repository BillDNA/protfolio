import React, {Component} from 'react';
import styled from 'styled-components';

const View = styled.div`
	background-color: ${props => props['background-color']};
	position: absolute;
	left: ${props => props.left === undefined ? 0 : props.left};
	right: ${props => props.right === undefined ? 0 : props.right};
	bottom: ${props => props.bottom === undefined ? 0 : props.bottom};
	top: ${props => props.top === undefined ? 0 : props.top};
`;
/*

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
	get position() {
		return this.props.position;
	}
	get left() {
		return this.props.left;
	}
	get right() {
		return this.props.right;
	}
	get top() {
		return this.props.top;
	}
	get bottom() {
		return this.props.bottom;
	}
	get padding() {
		return this.props.padding;
	}
	get margin() {
		return this.props.margin;
	}
	get backgroundColor() {
		return this.props.backgroundColor;
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
	render() {
		return (
			<div className={this.className}
			     id={this.id}
			     style={this.props.style === undefined ? this.style : this.props.style}
			     onMouseMove={this.props.onMouseMove}
			     onMouseDown={this.props.onMouseDown}
			     onMouseUp={this.props.onMouseUp}
			     onMouseLeave={this.props.onMouseLeave}
			>
				{this.props.children}
			</div>
		);
	}
}
*/
export default View;