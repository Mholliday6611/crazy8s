import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"

ReactDOM.render(
	<Router>
		<Route path="/:room" component={App} />
	</Router>, 
	document.getElementById('root'));
registerServiceWorker();
