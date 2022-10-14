import React from 'react';
import styles from '../css/Card.module.css';
import troll from '../assets/png/troll.png';

export default class Card extends React.Component {
    handleClick(e) {
        console.log(e);
    }
    Card(){
    
    }
    
    render() {

        // console.log(this.props.index)
        // if(this.props.isClicked){
        //     document.getElementById("#card" + this.props.index).style.height='100px';
        //     console.log(document.getElementById(this.props.index))
        // }
        // else {
        //     if (this.props.index){
        //         // document.getElementById("#card" + this.props.index).style.height='60px';
        //     }
        // }

        if(this.props.who =="me"){
            return (
                <div id={"#card" + this.props.index} className={styles.card} onClick={() => this.handleClick(this.props)}>
                    <img src={troll} className={styles.img_card} alt="img"/>
                    <p className={styles.name_card}>{this.props.name}</p>
                    <div className={styles.infos_card}>
                        <p className={styles.pv_card}>{this.props.pv}</p>
                        <p className={styles.force_card}>{this.props.attack}</p>
                    </div>
                </div>
                
            );
        }else{
            return (
                <div className={styles.card_enemy}>
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
}



