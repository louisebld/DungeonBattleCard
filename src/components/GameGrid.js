import React from 'react';
import EmptyCard from './EmptyCard';
import styles from './GameGrid.module.css';


export default class GameGridV2 extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.column}>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>

                </div>
                <div className={styles.column}>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>

                </div>
                <div className={styles.column}>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>

                </div>
            </div>
        )
    }
}