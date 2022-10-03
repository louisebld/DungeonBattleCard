import { db } from '../firebase.js';
import { collection, getDocs } from "firebase/firestore";
import Card from '../components/Card.js';
import { v4 as uuidv4, v4 } from 'uuid';



const cyclop = '../assets/png/cyclop.png';
const troll = '../assets/png/troll.png';
const goblin = '../assets/png/goblin.png';


function generateCard(who){
    var possiblenames = ["coco", "rico", "pépito", "patate", "cricri"]
    var img = [cyclop, troll, goblin]
    var pv = Math.floor(Math.random() * 10) + 1;
    var attack = Math.floor(Math.random() * 10) + 1;
    var name = possiblenames[Math.floor(Math.random() * possiblenames.length)];
    var card = {
        name: name,
        pv: pv,
        attack: attack,
        img: img[Math.floor(Math.random() * img.length)],
        who:who,
    }
    return card;
}

// async function generateCard2(){
//     var cards = [];
//     var card = {};
//     const querySnapshot = await getDocs(collection(db, "cards"));
//     querySnapshot.forEach((doc) => {
//         cards.push(doc.data());
//         });
    
//     var random = Math.floor(Math.random() * cards.length);
//     var card = {
//         index: uuidv4(),
//         name: cards[random].name,
//         pv: cards[random].pv,
//         attack: cards[random].attack,
//         img: cards[random].img,
//     }
//     console.log("cards : " + JSON.stringify(card));
//     return card;
// }

// async function generateCard(){
//     return generateCard2().then((card) => {
//             // return <Card idkey={1} name={card.name} attack={card.attack} pv={card.pv} img={card.img}/>;
//             return card;
//         })
// }

export default generateCard;