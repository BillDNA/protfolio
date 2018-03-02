import styled from 'styled-components';

const NavBtn = styled.div`
	background-color: ${props => props['background-color']};
	grid-area: nav-btn;
	height: 100%;
	color: ${props => props.expanded ? 'red' : 'black'};
`;

export default NavBtn;