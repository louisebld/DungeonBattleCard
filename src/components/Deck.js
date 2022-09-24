import React from 'react';
import Card from './Card';
import styles from './Deck.module.css';

export default class Deck extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                {this.props.value.map((card, index) => {
                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                })}
            </div>
        );
    }
}