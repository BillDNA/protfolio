import styled from 'styled-components';
import NavBtn from './NavBtn';

const Location = styled.div`
	background-color: ${props => props['background-color']};
	grid-area: loc;
	height: 100%;
	text-align: center;
	
`;
/*
	grid-auto-rows: minmax(20px, auto);
	display: subgrid;
	height: '100%';
	*/
//overflow: ${props => props.expanded ? 'visible' : 'hidden'};

export default Location;