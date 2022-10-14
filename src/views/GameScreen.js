import React, { Component } from 'react';
import { useState, useEffect } from "react";
import styles from '../css/GameScreen.module.css';
import GameGrid from '../components/GameGrid'
import Deck from '../components/Deck'
import DeckAdversaire from '../components/DeckAdversaire'
import generateCard from '../functions/generateCard';
import { v4 as uuidv4, v4 } from 'uuid';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase.js';
import { getFirestore } from 'firebase/firestore/lite'
import { collection, getDocs } from "firebase/firestore";
// import Card from './Card';
// const [win, setWin] = useState(false);


async function generateCards(player){

    var cardsFromDb = [];
    var card = {};
    var listCards = [];
    const querySnapshot = await getDocs(collection(db, "cards"));
    querySnapshot.forEach((doc) => {
        cardsFromDb.push(doc.data());
    });
    for (var i = 0; i < 4; i++){
        // get all the data from the cards
        var random = Math.floor(Math.random() * cardsFromDb.length);
        // create a mix of the cards to create one cards
        card = {
            // index: uuidv4(),
            name: cardsFromDb[random].name,
            pv: cardsFromDb[random].pv,
            attack: cardsFromDb[random].attack,
            img: cardsFromDb[random].img,
            who: player,
        }
        listCards.push(card);
    }
    return listCards;
}

async function getAllCardsFromDb(){
    var cardsFromDb = [];
    const querySnapshot = await getDocs(collection(db, "cards"));
    querySnapshot.forEach((doc) => {
        cardsFromDb.push(doc.data());
    });
    return cardsFromDb;
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


export default class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heart:0,
            heartEnemy: 0,
            deck: [],
            plateau: createEmptyPlateau(),
            cards: [],
            cardSelected: null,
            played:false,
            emplacementTouche : [false, false, false],
        };
      };

      componentDidMount() {
        generateCards("me").then( (listCards) => {
                this.setState({deck: listCards});
            }
        )
    }

    handleCallback = (childData) => {
        this.setState({heart: childData});
        // this.setState({played: childData});
        this.setState({cardSelected: childData});
    };

    computerPlaceCard(){
        var card = generateCard('computer');
        console.log(card);
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
                    // console.log(card.who);
                    if (plateau[i][j].who == "computer")
                    {
                            nouveauplateau[i][j+1] = plateau[i][j];
                        
                    } else {
                        // console.log("position après ", i, j);
                        // console.log("position avant", i, j);

                        nouveauplateau[i][j-1] = plateau[i][j];
                    }
                }
            }

        }

        for(var i = 0; i < 3; i++){
            if (nouveauplateau[i][0].who == "me"){
                var emplacementTouche = [this.state.emplacementTouche[0], this.state.emplacementTouche[1], this.state.emplacementTouche[2]];
                emplacementTouche[i] = true;
                this.setState({emplacementTouche : emplacementTouche});
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
			<GameGrid value={this.state.plateau} heart={this.state.heart} cardSelected={this.state.deck[this.state.cardSelected]} fromChild={this.handleCallback} played={this.state.played} emplacementTouche={this.state.emplacementTouche}/>

            <button className={styles.button} onClick={() => {this.finDuTour()}} type="button">Fin du tour</button>

            <Deck value={this.state.deck} fromChildCard={this.handleCallback}/>
            {/* <button onClick={() => {this.computerPlaceCard()}}>heart</button>
            <button onClick={() => {this.AvanceColonne1()}}>avance</button>
             */}
            <button onClick={() => {console.log(this.state.cardSelected)}}>card</button>

		</div>
	)
}
}
