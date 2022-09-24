import React, { Component } from 'react';
import {Link} from "react-router-dom";
import styles from './HomeScreen.module.css';
import logo from '../assets/png/kitty.png';

// import Card from '../components/Card';
export default class HomeScreen extends Component {

render() {

    return(
		<div className={styles.container}>
            <div className={styles.menu}>
                <h1 className={styles.title_menu}>Meow Battle Card</h1>
                <img className={styles.img_menu} src={logo} alt="cat"/>
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
                </div>
            </div>
		</div>
	)
}
}
