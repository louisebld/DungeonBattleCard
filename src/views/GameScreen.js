import React, { Component } from 'react';
import styles from './GameScreen.module.css';
import GameGrid from '../components/GameGrid'
import Card from '../components/Card'
import Deck from '../components/Deck'
import DeckAdversaire from '../components/DeckAdversaire'

function generateCard(){
    var possiblenames = ["coco", "rico", "pépito", "patate", "cricri"]
    var possiblesimg = ["monster1.png", "monster2.png", "plant.png", "plant2.png", "plant3.png"]
    var pv = Math.floor(Math.random() * 10) + 1;
    var attack = Math.floor(Math.random() * 10) + 1;
    var name = possiblenames[Math.floor(Math.random() * possiblenames.length)];
    var img = '../assets/card/' + possiblesimg[Math.floor(Math.random() * possiblesimg.length)];

    var card = {
        name: name,
        pv: pv,
        attack: attack,
        img: '../assets/card/plant.png'
    }
    return card;
}

function generateDeck(){
    var deck = [];
    for(var i = 0; i < 4; i++){
        deck.push(generateCard());
    }
    return deck;
}



export default class GameScreen extends Component {

render() {
    return(
		<div className={styles.main}>
			<DeckAdversaire/>
			<GameGrid/>
			<Deck value={generateDeck()}/>
		</div>
	)
}
}
