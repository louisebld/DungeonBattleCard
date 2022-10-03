import React, { Component } from 'react';
import {Link} from "react-router-dom";
import styles from '../css/HomeScreen.module.css';
import generateCard from '../functions/generateCard';
import generateCardFromFireB from '../functions/generateCardFromDB'
import { v4 as uuidv4, v4 } from 'uuid';

import logo from '../assets/png/dungeon.png';

import Card from '../components/Card';
export default function HomeScreen (){
        // var deck =[];
        const [deck, setDeck] = React.useState([]);


        // add a card into the deck from the generateCard function
        function addCardToDeck(deck){
            const card = generateCardFromFireB();
            // wait till the card is generated
            card.then(
                (card) => {
                    console.log(card);
                    setDeck([...deck, card]);
                }
            )
            card.then(
                (card) => {
                    console.log(deck);
                }
            )
            // console.log("res =" +card);
            // deck.push(card);
            // console.log("deck : " + deck);
        }
        // addCardToDeck(deck);
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
                        <button onClick={() => {
                            addCardToDeck(deck)
                            // document.getElementById("card").innerHTML = <Card idkey="1" name={"hello"} attack={1} pv={1} img={"ez"}/>;
                            }}>Add card</button>

                    </div>
                    <div id='card'>
                        {   
                            deck.map((card, index) => {
                                return(
                                    <div>
                                        <Card id={card.index} key={card.index} name={card.name} pv={card.pv} attack={card.attack} img={card.img} />
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
