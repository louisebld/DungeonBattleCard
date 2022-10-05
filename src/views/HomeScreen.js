import React, { Component } from 'react';
import {Link} from "react-router-dom";
import styles from '../css/HomeScreen.module.css';
import generateCard from '../functions/generateCard';
import FinalGenCard from '../functions/FinalGenCard';
import { v4 as uuidv4, v4 } from 'uuid';

import logo from '../assets/png/dungeon.png';
import Card from '../components/Card';
export default function HomeScreen (){
        // var deck =[];
        const [deck, setDeck] = React.useState([]);


        // add a card into the deck from the generateCard function
        // function addCardToDeck(deck){
        //     const card = generateCardFromFireB();
        //     // wait till the card is generated
        //     card.then(
        //         (card) => {
        //             console.log(card);
        //             setDeck([...deck, card]);
        //         }
        //     )
        //     card.then(
        //         (card) => {
        //             console.log(deck);
        //         }
        //     )
        // }
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
                    </div>
                    <div id='card'>
                        <FinalGenCard/>
                    </div>
                </div>
            </div>
        )
    }
