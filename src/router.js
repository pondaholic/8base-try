import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/home';
import PostForm from './components/submit'
import { Authorization } from './components/login'
import authCallback from './authCallback';

export default function Routes () {
	return (
		<Switch>
			<Route path="/auth/callback" component={authCallback} />
			<Route path="/submit" component={PostForm} />
			<Route path="/login" component={Authorization} />
			<Route path="/" component={Home} />
		</Switch>
	)
}