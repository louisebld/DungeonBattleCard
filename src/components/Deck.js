import React from 'react';
import Card from './Card';
import FinalGenCard from '../functions/FinalGenCard';
import generateCard from '../functions/generateCard';
import styles from '../css/Deck.module.css';
import { v4 as uuidv4, v4 } from 'uuid';
import { db } from '../firebase.js';
import { collection, getDocs } from "firebase/firestore";
import {useEffect, useState} from 'react'


export default class Deck extends React.Component {
    // transform the props to an array of cards
    constructor(props) {
        super(props);
        this.state = {
            deck: this.props.value,
            cardSelected : this.props.cardSelected,
        }
    }

    sendCardSelected(nb){
        this.props.fromChildCard(nb);
      };



    // remove card from the deck with his index
    removeCardFromDeck(index) {
        let deck = this.state.deck;
        deck.splice(index, 1);
        this.setState({deck: deck});
        this.state.deck.splice(index, 0, generateCard("me"));
    }

    cardSelected(index){
        this.setState({cardSelected: this.state.deck[index]});
        this.sendCardSelected(index);
        var card = document.getElementById("#card" + index);
        // console.log(card);
        if (card !== null) {
            // card.style.height='100px';
        }
    }

    

    render() {
        return (
            <div className={styles.container}>
                {this.props.value.map((card, index) => {
                    return <div key={index} className={styles.card} onClick={() => this.cardSelected(index)}><Card id={"#card_ + {index}"} key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img} who={card.who} index={index} deck={true} /></div>;
                })}
            </div>

        );
    }
}