import { db } from '../firebase.js';
import { collection, getDocs } from "firebase/firestore";



const cyclop = '../assets/png/cyclop.png';
const troll = '../assets/png/troll.png';
const goblin = '../assets/png/goblin.png';


function generateCard(){
    var possiblenames = ["coco", "rico", "pépito", "patate", "cricri"]
    var img = [cyclop, troll, goblin]
    var pv = Math.floor(Math.random() * 10) + 1;
    var attack = Math.floor(Math.random() * 10) + 1;
    var name = possiblenames[Math.floor(Math.random() * possiblenames.length)];

    var card = {
        name: name,
        pv: pv,
        attack: attack,
        img: img[Math.floor(Math.random() * img.length)]
    }
    return card;
}

// async function generateCard(){
//     var cards = [];
//     var card = {};
//     const querySnapshot = await getDocs(collection(db, "cards"));
//     querySnapshot.forEach((doc) => {
//         cards.push(doc.data());
//         });
//     // console.log(cards);
//     console.log(cards);
//     var random = Math.floor(Math.random() * cards.length);
//         var card = {
//         name: cards[random].name,
//         pv: cards[random].pv,
//         attack: cards[random].attack,
//         img: cards[random].img,
//     }
//     return card;
// }

// function generateCard3(){
//     generateCard().then((card) => {
//             return card;

//     })
// }


export default generateCard;