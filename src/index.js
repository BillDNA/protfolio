//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//CSS
import './css/index.css';
//Components
import App from './components/App';
//Service Workers
import registerServiceWorker from './serviceWorkers/registerServiceWorker';
//Setup

//Render
ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();