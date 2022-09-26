import React from 'react';
import styles from '../css/DeckAdversaire.module.css';
import EmptyCard from './EmptyCard';

export default class DeckAdversaire extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <EmptyCard className={styles.card}/>
                <EmptyCard className={styles.card}/>
                <EmptyCard className={styles.card}/>
                <EmptyCard className={styles.card}/>
            </div>
        );
    }
}

// const square = {
//     backgroundColor: "#7cb48f",
//     width: 100,
//     height: 100,
//     margin: 4,
//     shadowColor: '#171717',
//     shadowOffset: {width: -2, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
// };
