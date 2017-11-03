import React from 'react';
//import App from './moudles/App.js';
import App from './moudles/App.js';

import Home from './moudles/Home/home';
import HOME from './Home/home';
import Collection from './moudles/Collection/collection';
import Image from './moudles/Image/image';
import Memorial from './moudles/Memorial/memorial';
import Study from './moudles/Study/study';
import Note from './moudles/Study/note';
import AddNote from './moudles/Study/addnote';
import Login from './Home/login';
import ReactDOM from 'react-dom';
import {
	Router,
	Route,
	hashHistory,
	IndexRoute
} from 'react-router';
ReactDOM.render((
	<Router history={hashHistory}>
		<Route component={Login} path="/"></Route>
		<Route component={HOME} path="/lovehome"></Route>
		<Route component={App}>	
			<Route component={Home} path="/home"></Route>
			<Route component={Image} path="/image"></Route>
			<Route component={Memorial} path="/memorial"></Route>
			<Route component={Collection} path="/collection"></Route>
			<Route component={Study} path="/study"></Route>
			<Route component={Note} path='/study/note/:noteid'></Route>
			<Route component={AddNote} path='/study/addnote'></Route>
			{/*<Route component={ Topic } path='/user/topic/:tabId'/>*/}
		</Route>
	</Router>
),document.getElementById('app'));