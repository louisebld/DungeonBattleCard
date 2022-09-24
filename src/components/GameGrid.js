import React from 'react';
import EmptyCard from './EmptyCard';
import styles from './GameGrid.module.css';

export default class GameGridV2 extends React.Component {
    
    handleClick = (event) => {
        console.log("le base du joueur se trouve en colonne : " + event);
        for(var i = 1; i <= 3; i++){
            if(i !== event){
                var button = document.querySelector("#btn_" + i);
                button.style.display = "none";
            }
            document.querySelector("#btn_" + event).classList.add(styles.disabled);
        }

    }
    
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.column}>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <button id="btn_1" className={styles.button_heart} onClick={() => {this.handleClick(1)}}>💗</button>
                </div>
                <div className={styles.column}>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>    
                    <button id="btn_2" className={styles.button_heart} onClick={() => {this.handleClick(2)}}>💗</button>
                </div>
                <div className={styles.column}>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <button id="btn_3" className={styles.button_heart} onClick={() => {this.handleClick(3)}}>💗</button>
                </div>
            </div>
        )
    }
}