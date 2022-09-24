import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Card from '../components/Card';
export default class HomeScreen extends Component {

render() {

    return(
		<div style={center}>
            <Link to="/game">
            <button type="button">
                Click Me!
            </button>
            </Link>


            {/* <Link to="/">Home</Link> |{" "} */}
		</div>
	)
}
}

const center ={
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
};
