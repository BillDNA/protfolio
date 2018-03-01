import styled from 'styled-components';

const Location = styled.div`
	background-color: ${props => props['background-color']};
	grid-area: loc;
	display: subgrid;
	overflow: ${props => props.expanded ? 'visible' : 'hidden'};
	cursor: context-menu;
`;

export default Location;