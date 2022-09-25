import React from 'react';
import styles from './Card.module.css';
import troll from '../assets/png/troll.png';

export default class Card extends React.Component {
    handleClick(e) {
        console.log(e);
    }
    
    render() {
        return (
            <div className={styles.card} onClick={() => this.handleClick(this.props)}>
                <img src={troll} className={styles.img_card} alt="img"/>
                <p className={styles.name_card}>{this.props.name}</p>
                <div className={styles.infos_card}>
                    <p className={styles.pv_card}>{this.props.pv}</p>
                    <p className={styles.force_card}>{this.props.attack}</p>
                </div>
            </div>
            
        );
    }
}



