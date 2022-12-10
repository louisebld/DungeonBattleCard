import React from 'react';
import styles from '../css/WinWindow.module.css';
import happymonster from '../assets/png/happy.png';
import sadmonster from '../assets/png/sad.png';

export default class Card extends React.Component {

        render(){
            return(
            <div className={styles.container}>
                <div className={styles.menu}>
                {this.props.winner==1 ? <img className={styles.img_menu} src={happymonster} alt="happy monster" /> 
                : <img className={styles.img_menu} src={sadmonster} alt="sad monster" />}
                {this.props.winner==1 ? <h1 className={styles.text}>Tu as gagné ! Bravo !</h1>
                : <h1 className={styles.text}>Tu as perdu ! Dommage !</h1>}
                    <div className={styles.link_menu}>
                            <button type="button" onClick={() => window.location.reload()} className={styles.button}>
                                Rejouer
                            </button>
                    </div>
                </div>
            </div>
            )
    }
}
