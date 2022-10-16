import React from 'react';
import styles from '../css/Card.module.css';

export default class Card extends React.Component {
    handleClick(e) {
        // console.log(e);        
    }
    Card(){
    
    }

    componentDidMount() {
        if(this.props.deck){
            var card = document.getElementById("#card" + this.props.index);
            // console.log(card);
            if (card !== null) {
                card.style.height='80px';
            }
        }
    }
    
    render() {

        if(this.props.who =="me"){
            return (
                <div id={"#card" + this.props.index} className={styles.card} onClick={() => this.handleClick(this.props)}>
                    <div className={styles.infos_card}>
                        <p className={styles.pv_card}>{this.props.pv}</p>
                        <p className={styles.force_card}>{this.props.attack}</p>
                    </div>
    
                    <img src={require(`../assets/png/${this.props.img}`)} className={styles.img_card} alt="img"/>
                    <p className={styles.name_card}>{this.props.name}</p>

                </div>
                
            );
        }else{
            return (
                <div className={styles.card_enemy}>
                    <div className={styles.infos_card}>
                        <p className={styles.pv_card}>{this.props.pv}</p>
                        <p className={styles.force_card}>{this.props.attack}</p>
                    </div>

                    <img src={require(`../assets/png/${this.props.img}`)} className={styles.img_card} alt="img"/>
                    <p className={styles.name_card}>{this.props.name}</p>
                </div>
                
            );
        }
    }
}



