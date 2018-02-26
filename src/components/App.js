import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
//components
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import UnderConstruction from "./UnderConstruction";
import Visualizer2D from './Visualizer2D';
//css
import '../css/App.css';


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
	}
}

function mapStateToProps(state) {
	console.log('state', state);
	return state;
}

export default connect(mapStateToProps, null)(App);
