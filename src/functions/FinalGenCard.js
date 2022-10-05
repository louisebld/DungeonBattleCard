import Card from '../components/Card.js';
import { v4 as uuidv4, v4 } from 'uuid';
import { db } from '../firebase.js';
import { collection, getDocs } from "firebase/firestore";
import React, {useEffect, useState} from 'react'


async function generateCard(){

    var cardsFromDb = [];
    var card = {};
    var listCards = [];
    const querySnapshot = await getDocs(collection(db, "cards"));
    querySnapshot.forEach((doc) => {
        cardsFromDb.push(doc.data());
    });
    for (var i = 0; i < 4; i++){
        // get all the data from the cards
        var random = Math.floor(Math.random() * cardsFromDb.length);
        // create a mix of the cards to create one cards
        card = {
            index: uuidv4(),
            name: cardsFromDb[random].name,
            pv: cardsFromDb[random].pv,
            attack: cardsFromDb[random].attack,
            img: cardsFromDb[random].img,
        }
        listCards.push(card);
    }
    return listCards;
}

// useEffect(() => {
//     // call the async function and create a card, set the card, and sett to the deck
//     generateCardFromFireB().then((card) => {
//         setCard(card);
//         setDeck([...deck, card]);
//     })
// }, [])



export default function FinalGenCard() {  
    const [deck, setDeck] = useState([]);

    // async function generateDeckFromFireB(){
    //     // create the deck of cards generated

    //     var card = await generateCard();
    //     deck.push(card);
    //     console.log(ldeck);
    //     return ldeck;
    // }

    useEffect(() => {
        let mounted = true;
        generateCard().then( (listCards) => {
            if (mounted) {
                setDeck(listCards);
            }
        })
        return () => mounted = false;
    }, [])

    return (
        <div className='deck'>
            <h1>My deck</h1>
            {
                deck.map((card) => {
                    return <Card key={card.index} name={card.name} attack={card.attack} pv={card.pv} img={card.img}/>
                })
            }
        </div>
    )
}
