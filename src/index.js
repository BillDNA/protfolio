//Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
//CSS
import './css/index.css';
//Components
import App from './components/App';
//Service Workers
import registerServiceWorker from './serviceWorkers/registerServiceWorker';
//Setup
import reducer from './reducers'
const store = createStore(reducer);
//Render
ReactDOM.render((
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
