import React from 'react';

export default class EmptyCard extends React.Component {

    render() {
        return (
        <div style={view}>
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
}