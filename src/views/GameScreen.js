import React, { Component } from 'react';
import { useState, useEffect } from "react";
import styles from '../css/GameScreen.module.css';
import GameGrid from '../components/GameGrid'
import Deck from '../components/Deck'
import DeckAdversaire from '../components/DeckAdversaire'
import { v4 as uuidv4, v4 } from 'uuid';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase.js';
import { getFirestore } from 'firebase/firestore/lite'
import { collection, getDocs } from "firebase/firestore";
// import Card from './Card';
// const [win, setWin] = useState(false);
const taille_colonne = 6;


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


function createEmptyPlateau(){
    var plateau = [];
    for(var i = 0; i < 3; i++){
        plateau.push([[], [], [], [], [], []]);
    }
    return plateau;
}


// function removeCardFromDeck(index) {
//     let deck = this.state.deck;
//     deck.splice(index, 1);
//     this.setState({deck: deck});
//     this.state.deck.splice(index, 0, generateCard());
// }

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
            cardSelected: -1,
            played:false,
            emplacementTouche : [false, false, false],
        };
      };

      componentDidMount() {
        generateCards("me").then( (listCards) => {
                this.setState({deck: listCards});
            }
        );

        getAllCardsFromDb().then( (listCards) => {
            this.setState({cards: listCards});
        }
        );
    }


    handleCallback = (childData) => {
        this.setState({heart: childData});
        this.setState({cardSelected: childData});

        console.log(childData);
        if(childData !== "-1"){
            var card = document.getElementById("#card" + childData);
            card.style.height='100px';
        }  

        // card.style.width='100px';
        for(var i = 0; i < 4; i++)
        {
            if (i != childData){
                var card = document.getElementById("#card" + i);
                card.style.height='60px';
            }
        }
    };

    handleCallbackPlayed = (childData) => {
        this.setState({played: childData});
        this.state.deck[this.state.cardSelected] = this.generateCard("me");       
        var button = document.getElementById("buttonFinDuTour");
        button.style.backgroundColor ="yellow";
    }

    generateCard(player){
        var randomcard = this.state.cards[Math.floor(Math.random() * this.state.cards.length)];
        var card = {
            name: randomcard.name,
            pv: randomcard.pv,
            attack: randomcard.attack,
            img: randomcard.img,
            who:player,
        }
        return card;
    }

    computerPlaceCard(){
        var card = this.generateCard("computer");
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
            
                if(plateau[i][j].length != 0){
                    if (plateau[i][j].who == "computer")
                    {       
                        nouveauplateau[i][j+1] = plateau[i][j];
                        // console.log("detect card " + this.detecteCardProche(nouveauplateau));
                    } else {
                        // console.log("position après ", i, j);
                        // console.log("position avant", i, j);
                        nouveauplateau[i][j-1] = plateau[i][j];
                    }
                }
            }
        }
        
        // console.log(this.detecteCardProche(nouveauplateau));
        // var posCardProche = this.detecteCardProche(nouveauplateau);
        // if(posCardProche != null){
        //     nouveauplateau = this.fightCard(nouveauplateau, posCardProche[0], posCardProche[1]);
        // }

        // if (this.detecteCardProche(nouveauplateau)){
        //     // console.log("PASSE ICI" + i + j);
        //     nouveauplateau = this.fightCard(nouveauplateau);
        // }

        nouveauplateau = this.detecteCardProche(nouveauplateau)

        for(var i = 0; i < 3; i++){
            if (nouveauplateau[i][0].who == "me"){
                var emplacementTouche = [this.state.emplacementTouche[0], this.state.emplacementTouche[1], this.state.emplacementTouche[2]];
                emplacementTouche[i] = true;
                this.setState({emplacementTouche : emplacementTouche});
            }
        }
        this.detectWinner();


        // console.log(plateau);
        // console.log(nouveauplateau);
        this.setState({plateau: nouveauplateau});
        var button = document.getElementById("buttonFinDuTour");
        button.style.backgroundColor ="#465362";
    }

    fightCard(plateau, i, j){
        var card1 = plateau[i][j];
        var card2 = plateau[i][j+1];
        console.log("card1 ", card1);
        console.log("card2 ", card2);

        if (card1.attack == card2.pv && card2.attack == card1.pv){
            // si les deux cartes sont à égalité
            console.log("egalité");
            plateau[i][j] = [];
            plateau[i][j+1] = [];
            alert("Egalité");

        } else if (card2.attack > card1.pv){
            console.log("card2 win");
            plateau[i][j] = [];
            card2.pv = card2.pv - card1.attack;
            alert("Tu as tué une des cartes du computer");
        } else if (card1.attack > card2.pv){
            console.log("card1 win");
            plateau[i][j+1] = [];
            card1.pv = card1.pv - card2.attack;
            alert("L'ordi a tué une de tes cartes");
        } else {
            // les deux cartes sont touchées mais pas mortes
            console.log("les deux cartes sont touchées mais pas mortes");
            card1.pv = card1.pv - card2.attack;
            card2.pv = card2.pv - card1.attack;
        }
        return plateau;
    }

    detecteCardProche(plateau){
        // check if two card are near for the next turn, if yes, they fight and return plateau
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < plateau[0].length; j++){
                if(plateau[i][j].length != 0){
                    if (plateau[i][j].who == "computer")
                    {
                        // console.log("detect card " + plateau[i][j].who);
                        // console.log("position après ", i, j);
                        if (j+1 < taille_colonne){
                            if (plateau[i][j+1].who == "me"){
                                console.log("card proche");
                                plateau = this.fightCard(plateau, i, j);
                            }
                        }
                    }
                }
            }
        }
        return plateau;
    }

    detectWinner(){
        console.log("emplacement touche : " + this.state.emplacementTouche);
        console.log("coeur enemie : " + this.state.heartEnemy);
        for (var i = 0; i < 3; i++){
            if (this.state.emplacementTouche[this.heartEnemy] == true){
                alert("Tu as gagné");
                return true;
            }
        }
        return false
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
			<GameGrid value={this.state.plateau} heart={this.state.heart} cardSelected={this.state.deck[this.state.cardSelected]} fromChild={this.handleCallback} fromChildPlayed={this.handleCallbackPlayed} played={this.state.played} emplacementTouche={this.state.emplacementTouche}/>

            <button className={styles.button} id="buttonFinDuTour" onClick={() => {this.finDuTour()}} type="button">Fin du tour</button>

            <Deck value={this.state.deck} fromChildCard={this.handleCallback}/>
            {/* <button onClick={() => {this.computerPlaceCard()}}>heart</button>
            <button onClick={() => {this.AvanceColonne1()}}>avance</button>
             */}
            {/* <button onClick={() => {console.log(this.state.played)}}>card</button> */}

		</div>
	)
}
}
