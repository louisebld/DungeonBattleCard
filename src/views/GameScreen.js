import React, { Component } from 'react';
import { useState } from "react";
import styles from '../css/GameScreen.module.css';
import GameGrid from '../components/GameGrid'
import Card from '../components/Card'
import Deck from '../components/Deck'
import DeckAdversaire from '../components/DeckAdversaire'
import generateCard from '../functions/generateCard';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase.js';
import { getFirestore } from 'firebase/firestore/lite'
import { collection, getDocs } from "firebase/firestore";


async function getCardFromDB(){
    const querySnapshot = await getDocs(collection(db, "cards"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
}

async function getCardFromDB2(id){
    const docRef = doc(db, "cards", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

function getCard(id){
    getCardFromDB2(id).then((card) => {
        return card;
    })
}


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

function generateDeck2(){
    var deck = [];
    for(var i = 0; i < 4; i++){
        deck.push(this.state.cards[Math.floor(Math.random() * this.state.cards.length)]);
    }
}

export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heart:0,
            deck: generateDeck(),
            plateau: createEmptyPlateau(),
            cards: [],
        };
      }
      handleCallback = (childData) => {
        this.setState({ heart: childData });
    };

    async componentDidMount(){
        var cards = [];
        const querySnapshot = await getDocs(collection(db, "cards"));
        querySnapshot.forEach((doc) => {
            cards.push(doc.data());
            });
        this.setState({cards: cards});
    
    }

render() {
    return(
		<div className={styles.main}>
			<DeckAdversaire/>
			<GameGrid value={this.state.plateau} fromChild={this.handleCallback}/>
			<Deck value={this.state.deck}/>
            {/* button */}
            <button onClick={() => {console.log(getCard("1"))}}>heart</button>
            {/* <Card name="card" value={getCardFromDB2(1)}/> */}
		</div>
	)
}
}
