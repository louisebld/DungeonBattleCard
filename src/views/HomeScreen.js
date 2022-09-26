import React, { Component } from 'react';
import {Link} from "react-router-dom";
import styles from '../css/HomeScreen.module.css';
import generateCard from '../functions/generateCard';

import logo from '../assets/png/dungeon.png';

// import Card from '../components/Card';
export default class HomeScreen extends Component {

render() {

    return(
		<div className={styles.container}>
            <div className={styles.menu}>
                <h1 className={styles.title_menu}>Dungeon Battle Card</h1>
                <img className={styles.img_menu} src={logo} alt="dungeon logo"/>
                <div className={styles.link_menu}>
                    <Link to="/game">
                        <button type="button" className={styles.button}>
                            Jouer
                        </button>
                    </Link>
                    <Link to="/">
                        <button type="button" className={styles.button}>
                            Règles
                        </button>
                    </Link>
                    <button onClick={() => {console.log(generateCard())}}>GET</button>

                </div>
            </div>
		</div>
	)
}
}
