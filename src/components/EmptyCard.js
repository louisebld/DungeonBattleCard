import React from 'react';
import styles from './Card.module.css';

export default class EmptyCard extends React.Component {

    render() {
        return (
        <div className={styles.card}>
        </div>
        );
    }
}

const view = {
    width: 60,
    height: 80,
    margin:5,
    backgroundColor: "#4B4E6D",
    borderRadius: 10,
}