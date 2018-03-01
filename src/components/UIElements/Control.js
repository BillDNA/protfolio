import React, {Component} from 'react';
import styled from 'styled-components';

const Control = styled.div`
	background-color: ${props => props['background-color']};
	grid-area: control;
`;

export default Control;