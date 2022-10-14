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
            heart: this.props.heart,
            heartEnemy: this.props.heartEnemy,
            played:this.props.played,
            emplacementTouche : this.props.emplacementTouche,
        };
}

    sendCardSelected(nb){
        this.props.fromChild(nb);
    };

    sendHasPlayed(value){
        this.props.fromChildPlayed(value);
    }

    
    ButtonEnemyHeart(nb){
        if(this.props.emplacementTouche[nb-1] == true){
            return <button id={"enemy_" + nb} className={styles.button_heart}>✖️</button>
        }
        else {
            return <button id={"enemy_" + nb} className={styles.button_heart}>❔</button>
        }
    }


    handleClickSelectBase (event){
        console.log("le base du joueur se trouve en colonne : " + event);
        for(var i = 1; i <=3; i++){
            if(i != event){
                var btn = document.getElementById("btn_" + i);
                // console.log(btn);
                btn.style.visibility = "hidden";
            }
        }

        document.querySelector("#btn_" + event).classList.add(styles.disabled);
        document.querySelector("#base_title").classList.add(styles.undisplay);
        document.querySelector("#base_heart").style.display = "flex";
        this.state.heart = event;
        this.setState({heart: event})

        // Create enemy base
        var pos = Math.floor(Math.random() * 3) + 1;
        // console.log("le base de l'ennemi se trouve en colonne : " + pos);
        this.state.heartEnemy = pos;
        this.setState({heartEnemy: pos})
        // add color to the right button
        document.querySelector("#enemy_" + pos).classList.add(styles.enemyBase);
        // console.log("le base de l'ennemi se trouve en colonne : " + pos);
    }

    pushCardPlateau = (index) => {
        console.log(this.props.cardSelected);
        // console.log("yoyuyouy")
        if(!this.props.played) {
            // console.log("passe ici");
        if(this.props.cardSelected !== null){
            // console.log("passe ici aussi");
            if (this.state.heart != 0){
                // let plateau = this.state.plateau;
                let plateau = this.props.value;
                let card = this.props.cardSelected;  
                console.log(card);          
                plateau[index][plateau[0].length-1] = card;
                this.setState({plateau: plateau});
                this.sendCardSelected("-1");
                this.sendHasPlayed(true);	
                this.state.played = true;
                // console.log(this.state.plateau);
                // this.setState({played: true});
            }
        }
    }
    }

    render() {
        return (
            <div className={styles.container}>
                <div id="base_title" className={styles.base_title}>Placez votre coeur ! </div>
                <div id="base_heart" className={styles.list_base_heartenemy}>
                    {this.ButtonEnemyHeart(1)}
                    {this.ButtonEnemyHeart(2)}
                    {this.ButtonEnemyHeart(3)}
                </div>

                <div className={styles.grid}>
                    <div className={styles.column}>
                        {this.props.value[0].map((card, index) => {
                            if(index === this.props.value[0].length -1){
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img} who={card.who}/>
                                }else{
                                    return <div onClick={() => this.pushCardPlateau(0)}><EmptyCard/></div>
                                }
                            }else{
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img} who={card.who}/>
                                }else{
                                    return <EmptyCard/>
                                }
                            }
                        })}
                    </div>
                    <div className={styles.column}>
                        {this.props.value[1].map((card, index) => {
                            if(index === this.props.value[0].length -1){
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img} who={card.who}/>
                                }else{
                                    return <div onClick={() => this.pushCardPlateau(1)}><EmptyCard/></div>
                                }
                            }else{
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img} who={card.who}/>
                                }else{
                                    return <EmptyCard/>
                                }
                            }
                        })}
                    </div>
                    <div className={styles.column}>
                        {this.props.value[2].map((card, index) => {
                            if(index === this.props.value[0].length -1){
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img} who={card.who}/>
                                }else{
                                    return <div onClick={() => this.pushCardPlateau(2)}><EmptyCard/></div>
                                }
                            }else{
                                if(card.name){
                                    return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img} who={card.who}/>
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

                {/* {/* <button id="btn_3" className={styles.button_heart} onClick={() => {console.log(this.props.value)}}>test</button> */}
                {/* <button id="btn_3" className={styles.button_heart} onClick={() => {console.log(this.props.emplacementTouche)}}>test</button> */}


            </div>
            
            
        )
    }
}