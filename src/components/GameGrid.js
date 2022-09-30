import React from 'react';
import Card from './Card';
import EmptyCard from './EmptyCard';
import styles from '../css/GameGrid.module.css';

export default class GameGridV2 extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            plateau: this.props.value,
            cardSelected : this.props.cardSelected,
            heart: 0,
            played:this.props.played,
        };
      }
      sendData(nb){
        this.props.fromChild(nb);
      };
    


    handleClickSelectBase (event){
        console.log("le base du joueur se trouve en colonne : " + event);
        for(var i = 1; i <=3; i++){
            if(i != event){
                var btn = document.getElementById("btn_" + i);
                console.log(btn);
                btn.style.visibility = "hidden";
            }
        }

        document.querySelector("#btn_" + event).classList.add(styles.disabled);
        document.querySelector("#base_title").classList.add(styles.undisplay);
        document.querySelector("#base_heart").style.display = "flex";
        // var div = document.querySelector("placeheart");
        // on cache placeheart
        // div.style.display = "none";        
        this.state.heart = event;
        this.sendData(event);
    }

    pushCardPlateau = (index) => {
        if(!this.state.played) {
        if(this.props.cardSelected !== null){
            if (this.state.heart != 0){
                let plateau = this.state.plateau;
                let card = this.props.cardSelected;            
                plateau[index][3] = card;
                this.setState({plateau: plateau});
                console.log(this.state.plateau)
                this.setState({cardSelected: null});
                this.props.fromChild(null);
                console.log(this.props.cardSelected);
                this.state.played = true;
            }
        }
    }
    }

    render() {
        return (
            <div className={styles.container}>
                <div id="base_title" className={styles.base_title}>Placez votre coeur ! </div>
                <div id="base_heart" className={styles.list_base_heartenemy}>
                    <button id="base_heart" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(1)}}>❔</button>
                    <button id="base_heart" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(2)}}>❔</button>
                    <button id="base_heart" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(3)}}>❔</button>
                </div>

                <div className={styles.grid}>
                    <div className={styles.column}>
                        {this.props.value[0].map((card, index) => {
                            if(index === 3){
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                                }else{
                                    return <div onClick={() => this.pushCardPlateau(0)}><EmptyCard/></div>
                                }
                            }else{
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                                }else{
                                    return <EmptyCard/>
                                }
                            }
                        })}

                    </div>
                    <div className={styles.column}>

                        {this.props.value[1].map((card, index) => {
                            if(index === 3){
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                                }else{
                                    return <div onClick={() => this.pushCardPlateau(1)}><EmptyCard/></div>
                                }
                            }else{
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                                }else{
                                    return <EmptyCard/>
                                }
                            }
                        })}
                    </div>
                    <div className={styles.column}>
                        {this.props.value[2].map((card, index) => {
                            if(index === 3){
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                                }else{
                                    return <div onClick={() => this.pushCardPlateau(2)}><EmptyCard/></div>
                                }
                            }else{
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
                                }else{
                                    return <EmptyCard/>
                                }
                            }
                        })}
                    </div>
                </div>
                <div className={styles.list_base_heart}>
                    <button id="btn_1" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(1)}}>💚</button>
                    <button id="btn_2" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(2)}}>💙</button>
                    <button id="btn_3" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(3)}}>❤️</button>
                </div>
            </div>
            
        )
    }
}