import React, { Component } from 'react';
import styles from './GameScreen.module.css';
import GameGrid from '../components/GameGrid'
import Card from '../components/Card'
import Deck from '../components/Deck'
import DeckAdversaire from '../components/DeckAdversaire'

import generateCard from '../functions/generateCard';


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
