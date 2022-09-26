import React, { Component } from 'react';
import { useState } from "react";

import styles from '../css/GameScreen.module.css';
import GameGrid from '../components/GameGrid'
// import Card from '../components/Card'
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

function createEmptyPlateau(){
    var plateau = [];
    for(var i = 0; i < 3; i++){
        plateau.push([[], [], [], []]);
    }
    return plateau;
}

function generateRandomPlateau(){
    var plateau = createEmptyPlateau();
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 4; j++){
            var random = Math.floor(Math.random() * 2);
            if(random === 1){
                plateau[i][j] = generateCard();
            }
        }
    }
    return plateau;
}

export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heart:0,
            deck: generateDeck(),
            plateau: createEmptyPlateau(),
        };
      }
      handleCallback = (childData) => {
        this.setState({ heart: childData });
    };

render() {
    return(
		<div className={styles.main}>
			<DeckAdversaire/>
			<GameGrid value={this.state.plateau} fromChild={this.handleCallback}/>
			<Deck value={this.state.deck}/>
            {/* button */}
            <button onClick={() => {console.log(this.state.heart)}}>Random</button>
		</div>
	)
}
}
