import React from 'react';
//import App from './moudles/App.js';
import App from './moudles/App.js';

import Home from './moudles/Home/home';
import HOME from './Home/home';
import Collection from './moudles/Collection/collection';
import Image from './moudles/Image/image';
import Memorial from './moudles/Memorial/memorial';
import ReactDOM from 'react-dom';
import {
	Router,
	Route,
	hashHistory,
	IndexRoute
} from 'react-router';
ReactDOM.render((
	<Router history={hashHistory}>
		<Route component={HOME} path="/"></Route>
		<Route component={App}>	
			<Route component={Home} path="/home"></Route>
			<Route component={Image} path="/image"></Route>
			<Route component={Memorial} path="/memorial"></Route>
			<Route component={Collection} path="/collection"></Route>
		</Route>
	</Router>
),document.getElementById('app'));