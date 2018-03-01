import React, {Component} from 'react';
import styled from 'styled-components';

const Page = styled.div`
	background-color: ${props => props['background-color']};
	grid-area: page;
`;

export default Page;