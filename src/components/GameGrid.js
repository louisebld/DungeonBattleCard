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
        };
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
        // var div = document.querySelector("placeheart");
        // on cache placeheart
        // div.style.display = "none";        
        this.state.heart = event;
        this.sendData(event);
    }

    pushCardPlateau = (index) => {

        if(this.props.cardSelected !== null){
            if (this.state.heart != 0){
            let plateau = this.state.plateau;
            console.log(this.state.cardSelected);
            let card = this.props.cardSelected;
            console.log(index)
            
            plateau[index][3] = card;
            this.setState({plateau: plateau});
            console.log(this.state.plateau)
            }
        }
        
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.column}>

                {/* <div id="placeheart">Placez votre coeur ! </div> */}

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

                    <button id="btn_1" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(1)}}>💗</button>
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
                    <button id="btn_2" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(2)}}>💗</button>
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
                    <button id="btn_3" className={styles.button_heart} onClick={() => {this.handleClickSelectBase(3)}}>💗</button>
                </div>

            </div>
            
        )
    }
}