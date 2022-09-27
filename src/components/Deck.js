import React from 'react';
import Card from './Card';
import styles from '../css/Deck.module.css';

import generateCard from '../functions/generateCard';

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
        this.state.deck.splice(index, 0, generateCard());
    }

    cardSelected(index){
        this.setState({cardSelected: this.state.deck[index]});
        this.sendCardSelected(this.state.deck[index]);
    }

    render() {
        return (
            <div className={styles.container} onClick={() => console.log(this.state.deck)}>
                {this.props.value.map((card, index) => {
                    return <div onClick={() => this.cardSelected(index)}><Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/></div>
                })}
            </div>
        );
    }
}