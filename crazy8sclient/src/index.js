import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"

ReactDOM.render(
	<div>
	<Router>
		<Route path="/" component={Home} />
		<Route exact path="/:room" component={App} />
	</Router>
	</div>, 
	document.getElementById('root'));
registerServiceWorker();
