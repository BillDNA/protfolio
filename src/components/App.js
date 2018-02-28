import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
//components
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import UnderConstruction from "./UnderConstruction";
import Visualizer2D from './Visualizer2D/Visualizer2D';
//css

import SliderInput from './UIElements/SliderInput';
import View from './UIElements/View.js'

class App extends Component {
	constructor(props) {
		super(props);
	}
	renderPage(pageName) {
		if(pageName==='Under Construction') {

		} else {
			return (<PageNotFound/>);
		}
	}
	render() {
		return (
			<View className="App" left='10%' right='10%' top='10%'>
				View
				<SliderInput top='35%' bottom='35%' background-color='purple'> slider </SliderInput>
			</View>
		)
	}
	/*
	render() {
		return (
			<div className="App">
				<Nav location="Under Construction" />
				<div className="page-body">
					<Switch>
						<Route exact path='/' component={Visualizer2D}/>
						<Route path='*' component={PageNotFound}/>
					</Switch>
				</div>
			</div>
		);
	}*/

}

export default App;

