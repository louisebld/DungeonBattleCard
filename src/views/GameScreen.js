import React, { Component } from 'react';
import { useState, useEffect } from "react";
import styles from '../css/GameScreen.module.css';
import GameGrid from '../components/GameGrid'
import Deck from '../components/Deck'
import DeckAdversaire from '../components/DeckAdversaire'
import WinWindow from '../components/WinWindow';
import CardTwo from '../components/CardTwo';
import { v4 as uuidv4, v4 } from 'uuid';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase.js';
import { getFirestore } from 'firebase/firestore/lite'
import { collection, getDocs } from "firebase/firestore";
import { wait } from '@testing-library/user-event/dist/utils';
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
            anim : false,
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
            winner:0,
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
        this.setState({cardSelected: childData});

        // console.log(childData);
        if(childData !== "-1"){
            var card = document.getElementById("#card" + childData);
            card.style.height='100px';
            card.style.width='60px';
        }  
        for(var i = 0; i < 4; i++)
        {
            if (i != childData){
                var card = document.getElementById("#card" + i);
                card.style.height='80px';
                card.style.width='50px';
            }
        }
    };

    handleCallbackPlayed = (childData) => {
        this.setState({played: childData});
        this.state.deck[this.state.cardSelected] = this.generateCard("me");       
        var button = document.getElementById("buttonFinDuTour");
        button.style.backgroundColor ="yellow";
    }

    handleCallbackHeartEnemy = (childData) => {
        this.setState({heartEnemy: childData});
    }

    handleCallbackHeart = (childData) => {
        this.setState({heart : childData});
    }

    handleCallbackEmplacementTouche = (childData) => {
        this.setState({emplacementTouche: childData});
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
        // console.log(card);
        var index = Math.floor(Math.random() * 3);
        var plateau = this.state.plateau;
        plateau[index][0] = card;
        this.setState({plateau: plateau});
    }

    async AvanceColonne1(){
        var plateau = this.state.plateau;
        var nouveauplateau = createEmptyPlateau();
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < plateau[0].length; j++){
                if(plateau[i][j].length != 0){
                    // ---- COMPUTER ----
                    if (plateau[i][j].who == "computer")
                    {       
                        if (this.detecteIfItCanMove(plateau, i, j, "computer")){
                            console.log(plateau[i][j].name + ": computer can move");
                            nouveauplateau[i][j+1] = plateau[i][j];
                            nouveauplateau[i][j] = [];
                            
                        }
                        else {
                            console.log(plateau[i][j].name + ": computer can't move");
                            nouveauplateau[i][j] = plateau[i][j];
                        }
                    // ---- PLAYER ---- 
                    } else {
                        if (this.detecteIfItCanMove(plateau, i, j, "me")){
                            console.log(plateau[i][j].name + ": player can move");
                            nouveauplateau[i][j-1] = plateau[i][j];
                            nouveauplateau[i][j] = [];
                        }
                        else {
                            console.log(plateau[i][j].name + ": player can't move");
                            nouveauplateau[i][j] = plateau[i][j];
                        }
                    }
                }
            }
        }

        this.setState({plateau: nouveauplateau});
        await sleep(2000);
    }

    detecteEmplacementTouche(){
        var nouveauplateau = this.state.plateau;
        for(var i = 0; i < 3; i++){
            if (nouveauplateau[i][0].who == "me"){
                var emplacementTouche = [this.state.emplacementTouche[0], this.state.emplacementTouche[1], this.state.emplacementTouche[2]];
                emplacementTouche[i] = true;
                this.setState({emplacementTouche : emplacementTouche});
            }
        }
    }

    detecteIfItCanMove (plateau, i, j, player){
        console.log(" " + i + " " + j);
        console.log(plateau[i][j].who);
        if (player == "me"){
            console.log("passe in player" + player)
            // Si je suis au bout du plateau c'est à dire sur la case tout en haut : j=0
            if (j == 0){
                console.log("je suis au bout du plateau");
                return true;
            }
            // Si la case au dessus est vide
            else if (this.estVide(plateau, i, j-1)){
                console.log("la case au dessus est vide");
                // Si la case au dessus encore est le computer
                if (this.estQui(plateau, i, j-2, "computer")){
                    console.log("la case au dessus encore est le computer");
                    return false;
                // Si la case au dessus encore est le joueur ou vide
                } else {
                    console.log("la case au dessus encore est le joueur ou vide");
                    return true;
                }
            // Si la case au dessus n'est pas vide
            } else if (!this.estVide(plateau, i, j-1)){
                console.log("la case au dessus n'est pas vide");
                if (plateau[i][j-1].who == "me"){
                    // tant que la case au dessus est le joueur 
                    var k = j-1;
                    while (plateau[i][k].who == "me"){
                        k--;
                    }
                    // Si la case au dessus encore est le computer
                    if (this.estQui(plateau, i, k-1, "computer")){
                        console.log("la case au dessus encore est le computer");
                        return false;
                    } else if (this.estQui(plateau, i, k-1, "me")){
                        console.log("la case au dessus encore est le joueur");
                        return true;
                    } else {
                        console.log("la case au dessus encore est vide");
                        if (k == 0){
                            return true;
                        } else {
                            if (this.estQui(plateau, i, k-1, "computer")){
                                return false;
                            }
                            else {
                                return true;
                            }
                        }
                    }
                } else {
                    console.log("la case au dessus est le computer");
                    return false;
                }
            // Si la case au dessus m'appartient pas
            } else if (this.estQui(plateau, i, j-1), player){
                console.log("la case au dessus m'appartient pas");
                return false;
            // si la case au dessus m'appartient 
            } else {
                // si la case encore au dessus est vide
                if (this.estVideo(plateau, i, j-2)){
                    // la carte d'encore au dessus est au computer
                    if (this.estQui(plateau, i, j-3, player)){
                        console.log("la carte d'encore au dessus est au computer");
                        return false;
                    } else {
                        console.log("la carte d'encore au dessus est au joueur");
                        return true;
                    }
                } else {
                    console.log("la case encore au dessus n'est pas vide");
                    return false;
                }
            }
        } else {
        //     console.log("passe in computer" + player)
        //     // Si je suis au bout du plateau c'est à dire sur la case tout en haut : j=0
        //     if (j == 0){
        //         console.log("je suis au bout du plateau");
        //         return true;
        //     }
        //     // Si la case au dessus est vide
        //     else if (this.estVide(plateau, i, j+1)){
        //         console.log("la case au dessus est vide");
        //         // Si la case au dessus encore est le computer
        //         if (this.estQui(plateau, i, j+2, "me")){
        //             console.log("la case au dessus encore est le computer");
        //             return false;
        //         // Si la case au dessus encore est le joueur ou vide
        //         } else {
        //             console.log("la case au dessus encore est le joueur ou vide");
        //             return true;
        //         }
        //     // Si la case au dessus n'est pas vide
        //     } else if (!this.estVide(plateau, i, j+1)){
        //         console.log("la case au dessus n'est pas vide");
        //         return false;
        //     // Si la case au dessus m'appartient pas
        //     } else if (this.estQui(plateau, i, j+1), player){
        //         console.log("la case au dessus m'appartient pas");
        //         return false;
        //     // si la case au dessus m'appartient 
        //     } else {
        //         // si la case encore au dessus est vide
        //         if (this.estVideo(plateau, i, j+2)){
        //             // la carte d'encore au dessus est au computer
        //             if (this.estQui(plateau, i, j+3, player)){
        //                 console.log("la carte d'encore au dessus est au computer");
        //                 return false;
        //             } else {
        //                 console.log("la carte d'encore au dessus est au joueur");
        //                 return true;
        //             }
        //         } else {
        //             console.log("la case encore au dessus n'est pas vide");
        //             return false;
        //         }
        //     }
            return false;
        }
    }

    estVide(plateau, i, j){
        // test si une case est vide
        // console.log(plateau);
        if (plateau[i][j].length == 0){
            return true;
        }
        else {
            return false;
        }
    }

    estQui(plateau, i, j, player){
        /**
         * If the player is the same as the player who owns the square, return true, otherwise return
         * false.
         * @param plateau - the game board
         * @param i - the row
         * @param j - the column
         * @param player - the player who's turn it is - "me" or "computer"
         * @returns a boolean value.
         */
        console.log("estQui : " + i + " " + j);
        if (j < 0 || j > 7){
            return false;
        } else {
            if (plateau[i][j].who == player){
                return true;
            }
            return false;
        }
    }

    fightCard(plateau, i, j, k, l){
        /**
         * The function takes two cards and compares their attack and pv values. If the attack value of one
         * card is greater than the pv value of the other card, the card with the lower pv value is removed
         * from the game. If the attack value of both cards is greater than the pv value of the other card,
         * both cards are removed from the game. If the attack value of both cards is less than the pv
         * value of the other card, the pv value of both cards is reduced by the attack value of the other
         * card.
         * 
         * I'm not sure if this is the best way to do this, but it works.
         * @param plateau - the game board
         * @param i - the row of the first card
         * @param j - the column of the card you want to attack with
         * @param k - the row of the card you clicked on
         * @param l - the line of the card you want to attack
         * @returns the plateau.
         */
        var card1 = plateau[i][j];
        var card2 = plateau[k][l];
        // console.log("card1 ", card1);
        // console.log("card2 ", card2);

        if (card1.attack >= card2.pv && card2.attack >= card1.pv){
            // si les deux cartes sont à égalité
            console.log("egalité");
            plateau[i][j] = [];
            plateau[k][l] = [];
            console.log("Egalité");
        } else if (card2.attack >= card1.pv){
            console.log("card2 win");
            plateau[i][j] = [];
            card2.pv = card2.pv - card1.attack;
            console.log("Tu as tué une des cartes du computer");
        } else if (card1.attack >= card2.pv){
            console.log("card1 win");
            plateau[k][l] = [];
            card1.pv = card1.pv - card2.attack;
            console.log("L'ordi a tué une de tes cartes");
        } else {
            // les deux cartes sont touchées mais pas mortes
            console.log("les deux cartes sont touchées mais pas mortes");
            card1.pv = card1.pv - card2.attack;
            card2.pv = card2.pv - card1.attack;
            plateau[i][j] = card1;
            plateau[k][l] = card2;
        }
        return plateau;
    }

    async checkFight(plateau){
        /**
         * It checks if there are two cards in a row that are not from the same player, and if so, it calls the
         * fightCard function.
         * @param plateau - the game board
         * @returns the plateau.
         */
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < plateau[0].length - 1; j++){
                if(plateau[i][j].length != 0 && plateau[i][j+1].length != 0){
                    if (plateau[i][j].who != plateau[i][j+1].who){
                        plateau = this.fightCard(plateau, i, j, i, j+1);
                        plateau[i][j].anim = true;
                        plateau[i][j+1].anim = true;
                        console.log(plateau);
                        console.log(document.querySelector("#card_"+i+"_"+j));
                        this.setState({plateau : plateau});
                        await sleep(1000);
                        plateau[i][j].anim = false;
                        plateau[i][j+1].anim = false;
                        this.setState({plateau : plateau});
                    }
                }
            }
        }
    }

    checkFightButOneCaseBetweenThem(plateau){
        /**
         * It checks if there are two cards in a row that are not from the same player, with one case free between them, and if so, it calls the
         * fightCard function.
         * @param plateau - the game board
         * @returns the plateau.
         */
        // console.log("checkfightbutonecasebetweenthem");
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < plateau[0].length - 2; j++){
                // check if there's no card in the middle, if so, fight
                if(plateau[i][j].length != 0 && plateau[i][j+2].length != 0 && plateau[i][j+1].length == 0){
                    if (plateau[i][j].who != plateau[i][j+2].who){
                        plateau = this.fightCard(plateau, i, j, i, j+2);
                        this.setState({plateau : plateau});
                    }
                }
            }
        }
    }

    detectWinner(){
        if(this.state.emplacementTouche[this.state.heartEnemy-1]===true){
            // alert("Tu as gagné");
            this.setState({winner: 1});
            return true;
        }

        var card = this.state.plateau[this.state.heart-1][this.state.plateau[0].length-1];
        if(card.length != 0 && card.who == "computer"){
            // alert("L'ordinateur a gagné")
            this.setState({winner: 2});
            return true;
        }
        return false
    }
    

    // setFalseAnimCard() {
    //     var plateau = this.state.plateau;
    //     for(var i = 0; i < plateau.length; i++){
    //         for(var j = 0; j < plateau[0].length; j++){
    //             plateau[i][j].anim = false;
    //         }
    //     }
    //     // this.setState({plateau: plateau});
    // }


    async finDuTour(){
        if (this.state.played == true){
            this.computerPlaceCard();
            await sleep(1000);
            this.AvanceColonne1();
            await sleep(1000);
            this.joue();
        }

    }

    async joue(){
        this.checkFightButOneCaseBetweenThem(this.state.plateau);
        this.checkFight(this.state.plateau);
        await sleep(1000);

        this.detecteEmplacementTouche();
        this.detectWinner();
        // var nouveauplateau = this.state.plateau;
        // nouveauplateau = this.detecteCardProche(nouveauplateau) 

        // the player can't play 2 times in a row
        this.setState({played: false});

        // update button finDeTour
        var button = document.getElementById("buttonFinDuTour");
        button.style.backgroundColor ="#465362";   
        button.style.backgroundColor ="#465362";

        // the card don't anim anymore  
        // this.setFalseAnimCard();
    }
    


render() {
    return(
		<div className={styles.main}>        
			<DeckAdversaire/>
            {/* <div class="bonjour"> bonjour </div> */}

			{this.state.winner==0 ? 
            <GameGrid value={this.state.plateau} heart={this.state.heart} cardSelected={this.state.deck[this.state.cardSelected]} fromChild={this.handleCallback} fromChildPlayed={this.handleCallbackPlayed} fromChildHeartEnemy={this.handleCallbackHeartEnemy} fromChildEmplacementTouche={this.handleCallbackEmplacementTouche} fromChildHeart={this.handleCallbackHeart} played={this.state.played} emplacementTouche={this.state.emplacementTouche}/>
            :
            <div className={styles.winner}>
                <WinWindow winner={this.state.winner}/>
            </div>
            }
            <button className={styles.button} id="buttonFinDuTour" onClick={() => {this.finDuTour()}} type="button">Fin du tour</button>
            {/* <button className={styles.button} id="buttonJoue" onClick={() => {this.joue()}} type="button">Joue</button> */}

            <Deck value={this.state.deck} fromChildCard={this.handleCallback}/>
            {/* <CardTwo/> */}
            {/* <button onClick={() => {this.computerPlaceCard()}}>heart</button>
            <button onClick={() => {this.AvanceColonne1()}}>avance</button>
             */}
            <button onClick={() => {console.log(this.estVide(this.state.plateau, 0, 5))}}>card</button>

		</div>
	)
}
}
