import React from 'react';
import Card from './Card';

export default class Deck extends React.Component {
    render() {
        return (
    <div style={container}>
      
        {this.props.value.map((card, index) => {
            return <Card key={index} name={card.name} pv={card.pv} attack={card.attack} img={card.img}/>
        })}

    </div>


            );
    }
}

    const container = {
        position:'absolute',
        bottom:0,
        width:'100%',
        backgroundColor: "#7CA1B4",
        alignItems: "center", // ignore this - we'll come back to it
        justifyContent: "center", // ignore this - we'll come back to it
        flexDirection: "row",
        display:'flex',
      };

      const square = {
        backgroundColor: "#7cb48f",
        width: 100,
        height: 100,
        margin: 4,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    
      };