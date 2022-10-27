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

    componentDidUpdate() {
        if(this.props.anim){
            var card = document.getElementById("#card" + this.props.index);
            console.log(card);
            card.style.transition = "transform 0.5s";
            console.log("ANIMME");
            // if (card !== null && this.props.who == "computer") {
            //     card.style.transform = "translateY(20px)";
            // }
            if (card !== null && this.props.who == "me") {
                card.style.transform = "translateY(-20px)";
            }
            // reset the position of the card
            setTimeout(function() {
                card.style.transform = "translateY(0px)";
            }, 500);
        }
    }
    render() {

        if(this.props.who =="me"){
            return (
                <div id={"#card" + this.props.index} className={styles.card} onClick={() => this.handleClick(this.props)}>
                    <div className={styles.infos_card}>
                        <p className={styles.force_card}>{this.props.attack}</p>
                        <p className={styles.pv_card}>{this.props.pv}</p>

                    </div>
                    <img src={require(`../assets/monsters/${this.props.img}`)} className={styles.img_card} alt="img"/>
                    <p className={styles.name_card}>{this.props.name}</p>

                </div>
                
            );
        }else{
            return (
                <div className={styles.card_enemy}>
                    <div className={styles.infos_card}>
                        <p className={styles.force_card}>{this.props.attack}</p>
                        <p className={styles.pv_card}>{this.props.pv}</p>
                    </div>

                    <img src={require(`../assets/monsters/${this.props.img}`)} className={styles.img_card} alt="img"/>
                    <p className={styles.name_card}>{this.props.name}</p>
                </div>
                
            );
        }
    }
}



