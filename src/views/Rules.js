import React from 'react'
import styles from "../css/Rules.module.css"
import Carousel from "../components/Carousel"


export default function Rules() {
  return (
    <div className={styles.home}>
        <div className={styles.container}>
            <header>
                <h1 className={styles.title}>Règles</h1>
            </header>
            <section className={styles.section}>
                {/* Carousel */}
                <Carousel />
            </section>
        </div>
    </div>
  )
}
