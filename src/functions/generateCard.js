function generateCard(){
    var possiblenames = ["coco", "rico", "pépito", "patate", "cricri"]
    var possiblesimg = ["monster1.png", "monster2.png", "plant.png", "plant2.png", "plant3.png"]
    var pv = Math.floor(Math.random() * 10) + 1;
    var attack = Math.floor(Math.random() * 10) + 1;
    var name = possiblenames[Math.floor(Math.random() * possiblenames.length)];
    var img = '../assets/card/' + possiblesimg[Math.floor(Math.random() * possiblesimg.length)];

    var card = {
        name: name,
        pv: pv,
        attack: attack,
        img: '../assets/card/plant.png'
    }
    return card;
}

export default generateCard;