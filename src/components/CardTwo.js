import React from 'react';
import styles from '../css/CardTwo.module.css';
export default class CardTwo extends React.Component {

    
    render() {
        return(
        <div className={styles.card}>
            <div className={styles.card_enemy}>
                <p className={styles.force_card}>5</p>
                <img src={require(`../assets/monsters/monster.png`)} className={styles.img_card} alt="img"/>
                <p className={styles.pv_card}>6</p>
            </div>
            <div className={styles.card_me}>
                <p className={styles.force_card}>5</p>
                <img src={require(`../assets/monsters/bidule.png`)} className={styles.img_card} alt="img"/>
                <p className={styles.pv_card}>6</p>
            </div>

        </div>
        )
    }
}



