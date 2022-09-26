import React from 'react';
import Card from './Card';
import EmptyCard from './EmptyCard';
import styles from '../css/GameGrid.module.css';

export default class GameGridV2 extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {};
      }
      sendData(nb){
        this.props.fromChild(nb);
      };
    


    handleClickSelectBase = (event) => {
        console.log("le base du joueur se trouve en colonne : " + event);
        for(var i = 1; i <= 3; i++){
            if(i !== event){
                var button = document.querySelector("#btn_" + i);
                button.style.display = "none";
            }
            document.querySelector("#btn_" + event).classList.add(styles.disabled);
        }
        this.sendData(event);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.column}>
                    {this.props.value[0].map((card, index) => {
                    if(card.name){
                        return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                    }else{
                        return <EmptyCard/>
                    }
                    })}

                    <button id="btn_1" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(1)}}>💗</button>
                </div>
                <div className={styles.column}>

                    {this.props.value[1].map((card, index) => {
                    if(card.name){
                        return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                    }else{
                        return <EmptyCard/>
                    }
                    })}
                    <button id="btn_2" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(2)}}>💗</button>
                </div>
                <div className={styles.column}>
                    {this.props.value[2].map((card, index) => {
                    if(card.name){
                        return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                    }else{
                        return <EmptyCard/>
                    }
                    })}
                    <button id="btn_3" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(3)}}>💗</button>
                </div>
            </div>
            
        )
    }
}