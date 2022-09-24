import React, { Component } from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import HomeScreen from './views/HomeScreen';
import GameScreen from './views/GameScreen';

class App extends Component {

   
  render() {
  	return(
		// <Router>
		<div className="main">
			<BrowserRouter>
				<div className="container" style={container}>
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

const container = {
	// backgroundColor: "grey",
	// display: "flex",
	// justifyContent: "center",
	// alignItems: "center",
	// height: "100%",
	// height: "100vh",
}

export default App;