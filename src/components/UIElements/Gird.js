import React, {Component} from 'react';
import styled from 'styled-components';

const Grid = styled.div`
	background-color: ${props => props['background-color']};
	display: grid;
	grid-template: 
		[head-left] "logo control"  [head-right]  
		[head-left] "loc  control"  [head-right]
		[main-left] "page page" [main-right] ;
	
	grid-template-columns: minmax(100px,10vh);
	grid-template-rows: minmax(80px, 8vh) minmax(20px, 2vh) auto;
	align-content: stretch;
	
	position:absolute;
	left: 0;
	right:0;
	top:0;
	bottom:0;
	
	
	@media (orientation: landscape) {
		left:  calc(((90vh) - 100vw) / -2);
		right: calc(((90vh) - 100vw) / -2);
		
	}
	@media (max-height: 1000px) and (orientation: landscape) {
			left:  calc(((100vh - 100px) - 100vw) / -2);
			right: calc(((100vh - 100px) - 100vw) / -2);
		}
	@media (orientation: portrait) {
		bottom: calc(90vh - 100vw);
	}
	
	@media (max-height: 1000px) and (orientation: portrait) {
		bottom: calc((100vh - 100px) - 100vw);
		}
`;

export default Grid;