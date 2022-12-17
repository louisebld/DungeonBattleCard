import React, { Component } from "react";
import styles from "../css/GameScreen.module.css";
import GameGrid from "../components/GameGrid";
import Deck from "../components/Deck";
import DeckAdversaire from "../components/DeckAdversaire";
import WinWindow from "../components/WinWindow";

import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

async function generateCards(player) {
  // @TODO : get all the cards from the database
  // @PARAMS : palyer : string
  // @RETURN : list of cards
  var cardsFromDb = [];
  var card = {};
  var listCards = [];
  const querySnapshot = await getDocs(collection(db, "cards"));
  querySnapshot.forEach((doc) => {
    cardsFromDb.push(doc.data());
  });
  for (var i = 0; i < 4; i++) {
    // get all the data from the cards
    var random = Math.floor(Math.random() * cardsFromDb.length);
    // create a mix of the cards to create one cards
    card = {
      // index: uuidv4(),
      name: cardsFromDb[random].name,
      pv: cardsFromDb[random].pv,
      attack: cardsFromDb[random].attack,
      img: cardsFromDb[random].img,
      who: player,
      anim: false,
    };
    listCards.push(card);
  }
  return listCards;
}

async function getAllCardsFromDb() {
  // TODO : get all the cards from the database
  // @RETURN : list of cards
  var cardsFromDb = [];
  const querySnapshot = await getDocs(collection(db, "cards"));
  querySnapshot.forEach((doc) => {
    cardsFromDb.push(doc.data());
  });
  return cardsFromDb;
}

function createEmptyPlateau() {
  // TODO : create an empty plateau
  // @RETURN : 2 dimensional array
  var plateau = [];
  for (var i = 0; i < 3; i++) {
    plateau.push([[], [], [], [], [], []]);
  }
  return plateau;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: 0,
      heartEnemy: 0,
      deck: [],
      plateau: createEmptyPlateau(),
      cards: [],
      cardSelected: -1,
      played: false,
      emplacementTouche: [false, false, false],
      winner: 0,
    };
  }

  componentDidMount() {
    // when the component is loaded, we generate the cards
    generateCards("me").then((listCards) => {
      this.setState({ deck: listCards });
    });

    getAllCardsFromDb().then((listCards) => {
      // just after we get all the cards from the database
      this.setState({ cards: listCards });
    });
  }

  handleCallback = (childData) => {
    this.setState({ cardSelected: childData });

    // console.log(childData);
    if (childData !== "-1") {
      var card = document.getElementById("#card" + childData);
      card.style.height = "100px";
      card.style.width = "60px";
    }
    for (var i = 0; i < 4; i++) {
      if (i !== childData) {
        var lcard = document.getElementById("#card" + i);
        lcard.style.height = "80px";
        lcard.style.width = "50px";
      }
    }
  };

  handleCallbackPlayed = (childData) => {
    this.setState({ played: childData });
    // this.state.deck[this.state.cardSelected] = this.generateCard("me");
    var ndeck = this.state.deck;
    ndeck[this.state.cardSelected] = this.generateCard("me");
    this.setState({ deck: ndeck });
    var button = document.getElementById("buttonFinDuTour");
    button.style.backgroundColor = "yellow";
  };

  handleCallbackHeartEnemy = (childData) => {
    this.setState({ heartEnemy: childData });
  };

  handleCallbackHeart = (childData) => {
    this.setState({ heart: childData });
  };

  handleCallbackEmplacementTouche = (childData) => {
    this.setState({ emplacementTouche: childData });
  };

  generateCard(player) {
    var randomcard =
      this.state.cards[Math.floor(Math.random() * this.state.cards.length)];
    var card = {
      name: randomcard.name,
      pv: randomcard.pv,
      attack: randomcard.attack,
      img: randomcard.img,
      who: player,
    };
    return card;
  }

  computerPlaceCard() {
    // TODO : place a card on the plateau
    // @RETURN : void
    var card = this.generateCard("computer");
    // console.log(card);
    var index = Math.floor(Math.random() * 3);
    var plateau = this.state.plateau;
    if (!this.lignePleine()) {
      while (!this.estVide(plateau, index, 0)) {
        console.log("bjur");
        console.log(index);
        index = Math.floor(Math.random() * 3);
      }
      plateau[index][0] = card;
      this.setState({ plateau: plateau });
    }
  }

  lignePleine() {
    // TODO : check if a line is full
    // @RETURN : boolean
    var plateau = this.state.plateau;
    for (var i = 0; i < 3; i++) {
      if (this.estVide(plateau, i, 0)) {
        return false;
      }
    }
    return true;
  }

  async AvanceColonne1() {
    // TODO : Avance chaque carte de 1 case si possible
    // @RETURN : void
    var plateau = this.state.plateau;
    var nouveauplateau = createEmptyPlateau();
    for (var i = 0; i < 3; i++) {
      sleep(1000);
      for (var j = 0; j < plateau[0].length; j++) {
        if (!this.estVide(plateau, i, j)) {
          // ---- COMPUTER ----
          if (this.estQui(plateau, i, j, "computer")) {
            if (this.detecteIfItCanMove(plateau, i, j, "computer")) {
              // le computer peut bouger
              // console.log(plateau[i][j].name + ": computer can move");
              if (j < plateau[0].length - 1) {
                nouveauplateau[i][j + 1] = plateau[i][j];
                if (this.estVide(nouveauplateau, i, j)) {
                  nouveauplateau[i][j] = [];
                }
              } else {
                console.log("cest la fin");
                // nouveauplateau[i][j] = []
              }
            } else {
              // le computer ne peut pas bouger
              // console.log(plateau[i][j].name + ": computer can't move");
              nouveauplateau[i][j] = plateau[i][j];
            }
            // ---- PLAYER ----
          } else {
            if (this.detecteIfItCanMove(plateau, i, j, "me")) {
              // le player peut bouger
              // console.log(plateau[i][j].name + ": player can move");
              nouveauplateau[i][j - 1] = plateau[i][j];
              nouveauplateau[i][j] = [];
            } else {
              // le player ne peut pas bouger
              // console.log(plateau[i][j].name + ": player can't move");
              nouveauplateau[i][j] = plateau[i][j];
            }
          }
          // this.setState({plateau: nouveauplateau});
          // sleep(10000)
        }
      }
      sleep(200);
    }

    this.setState({ plateau: nouveauplateau });
    await sleep(2000);
  }

  detecteEmplacementTouche() {
    // TODO : detecte si un emplacement est touché
    // @RETURN : void
    var nouveauplateau = this.state.plateau;
    for (var i = 0; i < 3; i++) {
      if (this.estQui(nouveauplateau, i, 0, "me")) {
        var emplacementTouche = [
          this.state.emplacementTouche[0],
          this.state.emplacementTouche[1],
          this.state.emplacementTouche[2],
        ];
        emplacementTouche[i] = true;
        this.setState({ emplacementTouche: emplacementTouche });
      }
    }
  }

  detecteIfItCanMove(plateau, i, j, player) {
    // @TODO : Regarde si une carte peut bouger
    // @PARAMS : plateau : array, i : int, j : int, player : string
    // @RETURN : boolean
    if (player === "me") {
      // Si je suis au bout du plateau c'est à dire sur la case tout en haut : j=0
      if (j === 0) {
        return true;
      }
      // Si la case au dessus est vide
      else if (this.estVide(plateau, i, j - 1)) {
        // Si la case au dessus encore est le computer
        if (this.estQui(plateau, i, j - 2, "computer")) {
          return false;
          // Si la case au dessus encore est le joueur ou vide
        } else {
          return true;
        }
        // Si la case au dessus n'est pas vide
      } else if (!this.estVide(plateau, i, j - 1)) {
        if (this.estQui(plateau, i, j - 1, "me")) {
          // tant que la case au dessus est le joueur
          var k = j - 1;
          while (this.estQui(plateau, i, k, "me")) {
            k--;
          }
          // Si la case au dessus encore est le computer
          if (this.estQui(plateau, i, k - 1, "computer")) {
            return false;
          } else if (this.estQui(plateau, i, k - 1, "me")) {
            return true;
          } else {
            if (k === 0) {
              return true;
            } else {
              if (this.estQui(plateau, i, k - 1, "computer")) {
                return false;
              } else {
                return true;
              }
            }
          }
        } else {
          return false;
        }
        // Si la case au dessus m'appartient pas
      } else if (this.estQui(plateau, i, j - 1, player)) {
        return false;
        // si la case au dessus m'appartient
      } else {
        // si la case encore au dessus est vide
        if (this.estVideo(plateau, i, j - 2)) {
          // la carte d'encore au dessus est au computer
          if (this.estQui(plateau, i, j - 3, player)) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    } else {
      // Si je suis au bout du plateau c'est à dire sur la case tout en bas : j = plateau[0].length-1
      if (j === plateau[0].length - 1) {
        return true;
      }
      // Si la case en dessous est vide
      else if (this.estVide(plateau, i, j + 1)) {
        // Si la case en dessous est le jour
        if (this.estQui(plateau, i, j + 2, "me")) {
          return false;
          // Si la case en dessous est le computer ou vide
        } else {
          return true;
        }
        // Si la case au dessous n'est pas vide
      } else if (!this.estVide(plateau, i, j + 1)) {
        if (this.estQui(plateau, i, j + 1, "computer")) {
          // tant que la case en dessous est le joueur
          var p = j + 1;
          while (this.estQui(plateau, i, p, "computer")) {
            p++;
          }
          // Si la case en dessous encore est le joueur
          if (this.estQui(plateau, i, p + 1, "me")) {
            return false;
          } else if (this.estQui(plateau, i, p + 1, "computer")) {
            return true;
          } else {
            if (p === plateau[0].length - 1) {
              return true;
            } else {
              if (this.estQui(plateau, i, p + 1, "me")) {
                return false;
              } else {
                return true;
              }
            }
          }
        } else {
          return false;
        }
        // Si la case en dessous m'appartient pas
      } else if (this.estQui(plateau, i, j + 1, player)) {
        return false;
        // si la case en dessous m'appartient
      } else {
        // si la case encore en dessous est vide
        if (this.estVideo(plateau, i, j + 2)) {
          // la carte d'encore en dessous est au joueur
          if (this.estQui(plateau, i, j + 3, player)) {
            // console.log("la carte d'encore en dessous est au joueur");
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  }

  estVide(plateau, i, j) {
    // @TODO : test si une case est vide
    // @PARAMS : plateau : array, i : int, j : int
    // @RETURN : boolean
    if (plateau[i][j].length === 0) {
      return true;
    } else {
      return false;
    }
  }

  estQui(plateau, i, j, player) {
    /**
     * If the player is the same as the player who owns the square, return true, otherwise return
     * false.
     * @param plateau - the game board
     * @param i - the row
     * @param j - the column
     * @param player - the player who's turn it is - "me" or "computer"
     * @returns a boolean value.
     */
    if (j < 0 || j >= 6) {
      return false;
    } else {
      if (plateau[i][j].who === player) {
        return true;
      }
      return false;
    }
  }

  fightCard(plateau, i, j, k, l) {
    /**
     * The function takes two cards and compares their attack and pv values. If the attack value of one
     * card is greater than the pv value of the other card, the card with the lower pv value is removed
     * from the game. If the attack value of both cards is greater than the pv value of the other card,
     * both cards are removed from the game. If the attack value of both cards is less than the pv
     * value of the other card, the pv value of both cards is reduced by the attack value of the other
     * card.
     *
     * I'm not sure if this is the best way to do this, but it works.
     * @param plateau - the game board
     * @param i - the row of the first card
     * @param j - the column of the card you want to attack with
     * @param k - the row of the card you clicked on
     * @param l - the line of the card you want to attack
     * @returns the plateau.
     */
    var card1 = plateau[i][j];
    var card2 = plateau[k][l];
    // console.log("card1 ", card1);
    // console.log("card2 ", card2);

    if (card1.attack >= card2.pv && card2.attack >= card1.pv) {
      // si les deux cartes sont à égalité
      plateau[i][j] = [];
      plateau[k][l] = [];
    } else if (card2.attack >= card1.pv) {
      plateau[i][j] = [];
      card2.pv = card2.pv - card1.attack;
    } else if (card1.attack >= card2.pv) {
      plateau[k][l] = [];
      card1.pv = card1.pv - card2.attack;
    } else {
      // les deux cartes sont touchées mais pas mortes
      card1.pv = card1.pv - card2.attack;
      card2.pv = card2.pv - card1.attack;
      plateau[i][j] = card1;
      plateau[k][l] = card2;
    }
    return plateau;
  }

  async checkFight(plateau) {
    /**
     * It checks if there are two cards in a row that are not from the same player, and if so, it calls the
     * fightCard function.
     * @param plateau - the game board
     * @returns the plateau.
     */
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < plateau[0].length - 1; j++) {
        // if(plateau[i][j].length != 0 && plateau[i][j+1].length != 0){
        if (!this.estVide(plateau, i, j) && !this.estVide(plateau, i, j + 1)) {
          if (plateau[i][j].who !== plateau[i][j + 1].who) {
            plateau = this.fightCard(plateau, i, j, i, j + 1);
            plateau[i][j].anim = true;
            plateau[i][j + 1].anim = true;
            this.setState({ plateau: plateau });
            await sleep(500);
            plateau[i][j].anim = false;
            plateau[i][j + 1].anim = false;
            this.setState({ plateau: plateau });
          }
        }
      }
    }
  }

  checkFightButOneCaseBetweenThem(plateau) {
    /**
     * It checks if there are two cards in a row that are not from the same player, with one case free between them, and if so, it calls the
     * fightCard function.
     * @param plateau - the game board
     * @returns the plateau.
     */
    // console.log("checkfightbutonecasebetweenthem");
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < plateau[0].length - 2; j++) {
        // check if there's no card in the middle, if so, fight
        // if(plateau[i][j].length != 0 && plateau[i][j+2].length != 0 && plateau[i][j+1].length == 0){
        if (
          !this.estVide(plateau, i, j) &&
          !this.estVide(plateau, i, j + 2) &&
          this.estVide(plateau, i, j + 1)
        ) {
          if (plateau[i][j].who !== plateau[i][j + 2].who) {
            plateau = this.fightCard(plateau, i, j, i, j + 2);
            this.setState({ plateau: plateau });
          }
        }
      }
    }
  }

  detectWinner() {
    // permet de détecter si le joueur a gagné ou perdu
    if (this.state.emplacementTouche[this.state.heartEnemy - 1] === true) {
      // alert("Tu as gagné");
      this.setState({ winner: 1 });
      return true;
    }

    var card =
      this.state.plateau[this.state.heart - 1][
        this.state.plateau[0].length - 1
      ];
    if (card.length !== 0 && card.who === "computer") {
      // alert("L'ordinateur a gagné")
      this.setState({ winner: 2 });
      return true;
    }
    return false;
  }

  async finDuTour() {
    // /if (this.state.played == true){
    this.computerPlaceCard();
    await sleep(500);
    this.AvanceColonne1();
    await sleep(500);
    this.joue();
    // }
  }

  async joue() {
    this.checkFightButOneCaseBetweenThem(this.state.plateau);
    this.checkFight(this.state.plateau);
    await sleep(1000);

    this.detecteEmplacementTouche();
    this.detectWinner();

    // the player can't play 2 times in a row
    this.setState({ played: false });

    // update button finDeTour
    var button = document.getElementById("buttonFinDuTour");
    button.style.backgroundColor = "#465362";
    button.style.backgroundColor = "#465362";
  }

  render() {
    return (
      <div className={styles.main}>
        <DeckAdversaire />

        {this.state.winner === 0 ? (
          <GameGrid
            value={this.state.plateau}
            heart={this.state.heart}
            cardSelected={this.state.deck[this.state.cardSelected]}
            fromChild={this.handleCallback}
            fromChildPlayed={this.handleCallbackPlayed}
            fromChildHeartEnemy={this.handleCallbackHeartEnemy}
            fromChildEmplacementTouche={this.handleCallbackEmplacementTouche}
            fromChildHeart={this.handleCallbackHeart}
            played={this.state.played}
            emplacementTouche={this.state.emplacementTouche}
          />
        ) : (
          <div className={styles.winner}>
            <WinWindow winner={this.state.winner} />
          </div>
        )}
        <button
          className={styles.button}
          id="buttonFinDuTour"
          onClick={() => {
            this.finDuTour();
          }}
          type="button"
        >
          Fin du tour
        </button>
        <Deck value={this.state.deck} fromChildCard={this.handleCallback} />
      </div>
    );
  }
}
