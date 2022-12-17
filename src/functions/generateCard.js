const cyclop = "../assets/png/cyclop.png";
const troll = "../assets/png/troll.png";
const goblin = "../assets/png/goblin.png";

function generateCard(who) {
  // @TODO : générer une carte aléatoire, ancienne version sans la bdd
  //   @PARAMS : who = "player" ou "enemy", string
  //   @RETURN : card = {name, pv, attack, img, who}, object
  var possiblenames = ["coco", "rico", "pépito", "patate", "cricri"];
  var img = [cyclop, troll, goblin];
  var pv = Math.floor(Math.random() * 10) + 1;
  var attack = Math.floor(Math.random() * 10) + 1;
  var name = possiblenames[Math.floor(Math.random() * possiblenames.length)];
  var card = {
    name: name,
    pv: pv,
    attack: attack,
    img: img[Math.floor(Math.random() * img.length)],
    who: who,
  };
  return card;
}

export default generateCard;
