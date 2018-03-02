import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import DropdownMenu from 'react-dd-menu';
import 'react-dd-menu/dist/react-dd-menu.min.css'
//components
import Grid from './UIElements/Gird';
import Logo from './UIElements/Logo';
import Control from './UIElements/Control';
import Page from './UIElements/Page';
import Location from './UIElements/Location';
import NavBtn from './UIElements/NavBtn';
//css
import '../css/App.css';
import SliderInput from './UIElements/SliderInput';
import View from './UIElements/View.js'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMenuOpen: false,
			currentLocation: 'Home'
		}
	}
	showMenu() {
		this.setState({isMenuOpen: true})
	}
	hideMenu() {
		this.setState({isMenuOpen: false})
	}
	render() {
		const menuOptions = {
			isOpen: this.state.isMenuOpen,
			close: this.hideMenu.bind(this),
			toggle: <Location
				onClick={() => this.showMenu()}
			>{this.state.currentLocation}</Location>,
			leaveTimeout: 150,
			align: 'center',
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
					Page
				</Page>
				<DropdownMenu {...menuOptions}>
					<li><a href="#">Example 1</a></li>
					<li><button type="button" onClick={this.click}>Example 2</button></li>
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

export default App;

