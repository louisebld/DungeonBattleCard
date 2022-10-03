import React, { Component } from 'react';
import { useState, useEffect } from "react";
import styles from '../css/GameScreen.module.css';
import GameGrid from '../components/GameGrid'
import Deck from '../components/Deck'
import DeckAdversaire from '../components/DeckAdversaire'
import generateCard from '../functions/generateCard';
import generateCardFromFireB from '../functions/generateCardFromDB';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase.js';
import { getFirestore } from 'firebase/firestore/lite'
import { collection, getDocs } from "firebase/firestore";
// import Card from './Card';
// const [win, setWin] = useState(false);



async function getCardFromDB(){
    const querySnapshot = await getDocs(collection(db, "cards"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data().name);
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
        deck.push(generateCard('me'));
        // deck.push(generateCardFromFireB());

    }
    // console.log(this.state);
    return deck;
}

function createEmptyPlateau(){
    var plateau = [];
    for(var i = 0; i < 3; i++){
        plateau.push([[], [], [], [], [], []]);
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

const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );


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
            heartEnemy: 0,
            deck: generateDeck(),
            plateau: createEmptyPlateau(),
            cards: [],
            cardSelected: null,
            played:false,
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
        this.setState({heart: childData});
        // this.setState({played: childData});
        this.setState({cardSelected: childData});
    };

    computerPlaceCard(){
        var card = generateCard('computer');
        var index = Math.floor(Math.random() * 3);
        var plateau = this.state.plateau;
        plateau[index][0] = card;
        this.setState({plateau: plateau});
    }

    AvanceColonne1(){
        var plateau = this.state.plateau;
        var nouveauplateau = createEmptyPlateau();
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < plateau[0].length; j++){
                
                var card = plateau[i][j];
                if(plateau[i][j].length != 0){
                    console.log(card.who);
                    if (plateau[i][j].who == "computer")
                    {
                            nouveauplateau[i][j+1] = plateau[i][j];
                        
                    } else {
                        console.log("position après ", i, j);
                        console.log("position avant", i, j);

                        nouveauplateau[i][j-1] = plateau[i][j];
                    }
                }
            }
        }
        // console.log(plateau);
        // console.log(nouveauplateau);
        this.setState({plateau: nouveauplateau});
    }

    async finDuTour(){
        this.computerPlaceCard();
        await sleep(1000);
        this.AvanceColonne1();
        this.setState({played: false});

        
    }
    

render() {
    return(
		<div className={styles.main}>        
			<DeckAdversaire/>
			<GameGrid value={this.state.plateau} cardSelected={this.state.cardSelected} fromChild={this.handleCallback} played={this.state.played}/>

            <button className={styles.button} onClick={() => {this.finDuTour()}} type="button">Fin du tour</button>

            <Deck value={this.state.deck} fromChildCard={this.handleCallback}/>
            {/* <button onClick={() => {this.computerPlaceCard()}}>heart</button>
            <button onClick={() => {this.AvanceColonne1()}}>avance</button>
             */}
            <button onClick={() => {console.log(this.state.deck)}}>card</button>

		</div>
	)
}
}
