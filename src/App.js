import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeScreen from './views/HomeScreen';
import GameScreen from './views/GameScreen';


class App extends Component {

  render() {
  	return(
		// <Router>
		<div className="main">
			<BrowserRouter>
				<div className="container">
					<Routes>
						<Route path="/" element={<HomeScreen />} />
						<Route path="/game" element={<GameScreen />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
  }
}


export default App;