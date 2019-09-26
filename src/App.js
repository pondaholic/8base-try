import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './router'
import Header from './components/header'

import './App.css';

function App () {
	return (
		<div className="App">
			<Router>
				<Header />
				<Routes />
			</Router>
		</div>
	)
}

export default App;
