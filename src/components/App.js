import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
//components
import Nav from './Nav';
import PageNotFound from './PageNotFound';
import UnderConstruction from "./UnderConstruction";
import Visulizer2D from './Visualizer2D';
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
						<Route exact path='/' component={Visulizer2D}/>
						<Route path='*' component={PageNotFound}/>
					</Switch>
				</div>
			</div>
		);
	}
}
export default App;
