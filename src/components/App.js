import React, { Component } from 'react';
import {Link,Switch, Route,Redirect} from 'react-router-dom';
import DropdownMenu from 'react-dd-menu';
import 'react-dd-menu/dist/react-dd-menu.min.css'
//components
import Grid from './UIElements/Gird';
import Logo from './UIElements/Logo';
import Control from './UIElements/Control';
import Page from './UIElements/Page';
import Location from './UIElements/Location';
//Pages
import PageNotFound from './PageNotFound';
import Visualizer2D from './Visualizer2D/Visualizer2D';
//css
import '../css/App.css';
import SliderInput from './UIElements/SliderInput';
import View from './UIElements/View.js'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: false,
			currentLocation: "Home"
		}
	}
	showMenu() {
		this.setState({isMenuOpen: true})
	}
	hideMenu() {
		this.setState({isMenuOpen: false})
	}
	render() {
		const Loc = ({ location }) => {
			console.log('match',location);
			return (
				<Location onClick={() => this.showMenu()}// this.showMenu()}
				> {
					location.pathname.length > 1 ?
						location.pathname.slice(1,location.pathname.length).capitalize() :
						"Home"
				}</Location>
			);
		};
		const menuOptions = {
			isOpen: this.state.isMenuOpen,
			close: this.hideMenu.bind(this),
			toggle: <Route component={Loc} />,
			leaveTimeout: 150,
			align: 'left',
			closeOnOutsideClick: true,
		};
		return (
			<Grid>
				<Logo background-color={'green'}>
					Logo
				</Logo>
				<Control background-color={'blue'}>
					controls
				</Control>
				<Page background-color={'purple'}>
					<Switch>
						<Route name="home" path='/' component={Visualizer2D}/>
						<Route name="home" path='/home' component={Visualizer2D}/>
						<Route name="404" component={PageNotFound} />

					</Switch>
				</Page>
				<DropdownMenu {...menuOptions}>
					<li><Link to='/Home' >Home</Link></li>
					<li><Link to='/about' >About</Link></li>
					<li><Link to='/visualizer' >Visualizer</Link></li>
				</DropdownMenu>
			</Grid>
		)
	}

	/*
	<Location
		background-color={'orange'}
		expanded={this.state.menuShowing}
		onClick={() => this.showMenu()}
		onMouseLeave={() => this.hideMenu()}
	>
		<NavBtn expanded={this.state.menuShowing}
				background-color={'yellow'}>
			Current</NavBtn>
		<NavBtn expanded={this.state.menuShowing}
				background-color={'lightgray'}>
			Home</NavBtn>
		<NavBtn expanded={this.state.menuShowing}
				background-color={'gray'}>
			About</NavBtn>
		<NavBtn expanded={this.state.menuShowing}
				background-color={'lightgray'}>
			Contact</NavBtn>
	</Location>*/
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

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

export default App;

