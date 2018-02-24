import React, { Component } from 'react';

//css
import '../css/Nav.css'

class Nav  extends React.Component {
	render() {
		return (
			<div className="nav-bar">
				<div className="nav-bar-location">
					<div className="nav-bar-title">
						<p><span>D</span>ynamic</p>
						<p><span>N</span>ew</p>
						<p><span>A</span>lgorithms</p>
					</div>
					<div className="nav-bar-sub-line">{this.props.location}</div>

				</div>
			</div>
		);
	}
}

export default Nav;
