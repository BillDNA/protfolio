import styled from 'styled-components';
import NavBtn from './NavBtn';

const Location = styled.div`
	background-color: ${props => props['background-color']};
	grid-area: loc;
	cursor: ${props => props.expanded ? 'pointer' : 'context-menu'};
	
	transform: translateY(${props => props.expanded ? '60px' : '0px'});
	transition: transform .4s ease-in;
	
`;
/*
	grid-auto-rows: minmax(20px, auto);
	display: subgrid;
	height: '100%';
	*/
//overflow: ${props => props.expanded ? 'visible' : 'hidden'};

export default Location;