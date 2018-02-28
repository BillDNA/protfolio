import React from 'react';
import View from '../../UIControllElements/View'
import SliderInput from '../../UIControllElements/SliderInput'

class ColorSelector  extends View {
	constructor(props) {
		super(props);
		this.state = {
			red: 128,
			green: 128,
			blue: 128
		};//TODO allow input from props to set default state might be a redux thing

	}
	get className() { //default value - color-selector
		if(this.props.className === undefined) {
			return super.className + ' color-selector';
		}
		return super.className + ' color-selector '+this.props.className;
	}
	get backgroundColor() { //default value - state
		if(this.props.backgroundColor === undefined) {
			return `rgb(${this.state.red},${this.state.green},${this.state.blue})`;
		}
		return this.props.backgroundColor;
	}
	get style() {
		let style = super.style;
		style = {... style,

		};
		return style;
	}

	updateRedColor(val) {
		this.setState({red:val})
	}
	updateGreenColor(val) {
		this.setState({green:val})
	}
	updateBlueColor(val) {
		this.setState({blue:val})
	}

	render() {
		console.log('style',this.style);
		return (
			<View className={this.className}
			      style={this.style}
			      id={this.id}
			>
				<SliderInput id="red-slider"
				             defaultValue={this.state.red}
				             fillColor={`rgb(${this.state.red},0,0)`}
				             bottom='66%'
				             padding='10'
				             setp='10'
				             onChange={this.updateRedColor.bind(this)}
				/>
				<SliderInput id="green-slider"
				             defaultValue={this.state.green}
				             fillColor={`rgb(0,${this.state.green},0)`}
				             top='33%'
				             bottom='33%'
				             padding='10'
				             onChange={this.updateGreenColor.bind(this)}
				/>
				<SliderInput id="blue-slider"
				             top='66%'
				             bottom='0'
				             padding='10'
				             fillColor={`rgb(0,0,${this.state.blue})`}
				             defaultValue={this.state.blue}
				             onChange={this.updateBlueColor.bind(this)}
				/>
			</View>
		);
	}
}

export default ColorSelector;