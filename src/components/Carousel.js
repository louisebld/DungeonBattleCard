import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import styles from "../css/Carousel.module.css"
import img1 from "../assets/png/dungeon.png"

// https://www.npmjs.com/package/react-responsive-carousel


const datas = [
    {
        title: "Bienvenue sur Dungeon Battle Card",
        content: {
            1: "Dungeon Battle Card est un jeu de plateau qui se joue en 1 contre 1.",
            2: "Le jeu ne se joue malheuresement que contre 1 ordinateur.",
            3: "Le but du jeu est de trouver la base enemi et que l'un de vos monstres détruisent cette base pour gagner la partie.",
        },
        // image : "https://i.ibb.co/0hY4Z8T/1.png"
    },
    {
        title: "Principe du jeu",
        content: {
            1: "Le jeu se joue en tour par tour. Le déroulé d'un de ces derniers est simple, vous devez poser un monstre sur la grille, au début du plateau.",
            2: "L'ordinateur fera de même. Une fois que vous le joueur à poser sa carte, et appuyer sur le bouton fin de tour, toutes les cartes avaceront d'une case.",
        },
    },
    {
        title: "Déroulement d'une partie",
        content: {
            1: "Lors du début de partie le coeur de l'ordinateur sera choisit aléatoirement. Le joueur quant à lui, choisira sa base en cliquant sur le coeur de son choix.",
            2: "Si une carte du joueur et de l'ordinateur viennent à se percuter, il y aura alors une bataille entre ces deux cartes. Si l'une des cartes n'a plus de vie, elle st détruite.",
        },
    },
];


class DemoCarousel extends Component {
    render() {
        return (
            <div className={styles.carousel}>
                <Carousel>
                    {datas.map((data, index) => {
                        return (
                            <div key={index}>
                                <h3>{data.title}</h3>
                                {Object.keys(data.content).map((key, index) => {
                                    return <p key={index}>{data.content[key]}</p>;
                                })}
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        );
    }
};

export default DemoCarousel;

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// 
