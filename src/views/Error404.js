import React from 'react'
import { Link } from 'react-router-dom'
// import image
import img from '../assets/monsters/error.png'
import styles from "../css/Error404.module.css"

export default function Error404() {
  return (
    <div className={styles.home}>
        <div className={styles.container}>
            <header>
                <h1 className={styles.title}>Erreur 404</h1>
            </header>
            <section className={styles.section}>
                Ooops ! La page que vous cherchez n'existe pas.
                Un monstre a détruit le chemin vers cette page... 
                <Link to="/">Cliquez ici pour revenir à l'accueil.</Link>
                <img src={img} alt="404" />
            </section>
        </div>
    </div>
  )
}
