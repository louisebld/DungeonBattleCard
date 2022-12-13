import React, { Component } from 'react';
import {Link} from "react-router-dom";
import styles from '../css/HomeScreen.module.css';
import logo from '../assets/png/dungeon.png';
export default function HomeScreen (){

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
                        <Link to="/rules">
                            <button type="button" className={styles.button}>
                                Règles
                            </button>
                        </Link>
                    </div>
                    <div className={styles.credits}>
                        Jeu de cartes créé par Louise BOLLARD & Tom THIERRY <br/>
                        TP INFO701 - React - 2022
                    </div>
                </div>
            </div>
        )
    }
