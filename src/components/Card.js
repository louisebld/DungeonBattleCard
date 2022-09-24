import React from 'react';

export default class Card extends React.Component {

    render() {
        // console.log(this.props)
        // console.log(this.props.img)
        return (
        <div style={view}>

            {this.props.name}
            <div style={pv}>{this.props.pv}</div>
            {/* require('../assets/card/plant.png') */}
            {/* require('' + this.props.img) */}
            {/* <Image style={styles.img} source={require('../assets/card/plant.png')}/> */}

            <div style={attack}>{this.props.attack}</div>
            
        </div>
        );
    }
}

    const view = {
        width: 60,
        height: 80,
        margin:5,
        backgroundColor: "#4B4E6D",
        borderRadius: 10,
    };
    const pv = {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        color: 'white',
        width: '10px',
        height: '20%',
        borderRadius: 10,
    };

    const attack = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'blue',
        color: 'white',
        width: '10px',
        height: '20%',
        borderRadius: 10,
    };
    const img = {
        position: 'absolute',
        width: 30,
        height: 30,
        top: '50%',
        left: '50%',
        
    };
