import React from 'react';
import styles from '../css/Emptycard.module.css';

export default class EmptyCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
        }
    }
    render() {
        return (
            <div key={this.state.index} className={styles.card}>
            </div>
        );
    }
}
