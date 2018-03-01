import React, {Component} from 'react';
import styled from 'styled-components';

const Logo = styled.div`
	background-color: ${props => props['background-color']};
	
	grid-area: logo;
`;

export default Logo;