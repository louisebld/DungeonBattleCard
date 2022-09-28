import React, { Component } from 'react';
import { useState, useEffect } from "react";
import styles from '../css/GameScreen.module.css';
import GameGrid from '../components/GameGrid'
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
    // console.log(this.state);
    return deck;
}

function createEmptyPlateau(){
    var plateau = [];
    for(var i = 0; i < 3; i++){
        plateau.push([[], [], [], []]);
    }
    return plateau;
}


function removeCardFromDeck(index) {
    let deck = this.state.deck;
    deck.splice(index, 1);
    this.setState({deck: deck});
    this.state.deck.splice(index, 0, generateCard());
}


function printProps(state){
    console.log(state);
}


/*
async function generateCard2(){
    var cards = [];
    var card = {};
    const querySnapshot = await getDocs(collection(db, "cards"));
    querySnapshot.forEach((doc) => {
        cards.push(doc.data());
        });
    // console.log(cards);
    var random = Math.floor(Math.random() * cards.length);
        var card = {
        name: cards[random].name,
        pv: cards[random].pv,
        attack: cards[random].attack,
        img: cards[random].img,
    }
    return card;
}
*/

export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heart:0,
            deck: generateDeck(),
            plateau: createEmptyPlateau(),
            cards: [],
            cardSelected: null,
        };
      };

    // async componentWillMount() {
    //     var cards = [];
    //     var card = {};
    //     const querySnapshot = await getDocs(collection(db, "cards"));
    //     querySnapshot.forEach((doc) => {
    //         cards.push(doc.data());
    //         });
    //     // console.log(cards);
    //     var random = Math.floor(Math.random() * cards.length);
    //         var card = {
    //         name: cards[random].name,
    //         pv: cards[random].pv,
    //         attack: cards[random].attack,
    //         img: cards[random].img,
    //     }
    //     this.setState({cards: cards});
    //     console.log(this.state.cards);
    //     return card;
    // }
      

      handleCallback = (childData) => {
        this.setState({ heart: childData});
        this.setState({ cardSelected: childData});
    };

    computerPlaceCard(){
        var card = generateCard();
        var index = Math.floor(Math.random() * 3);
        var plateau = this.state.plateau;
        plateau[index][0] = card;
        this.setState({plateau: plateau});
    }
    

render() {
    return(
		<div className={styles.main}>
			<DeckAdversaire/>
			<GameGrid value={this.state.plateau} cardSelected={this.state.cardSelected} fromChild={this.handleCallback}/>
            <button type="button">Fin du tour</button>

            <Deck value={this.state.deck} fromChildCard={this.handleCallback}/>
            <button onClick={() => {this.computerPlaceCard()}}>heart</button>

		</div>
	)
}
}
