import React from 'react';
import EmptyCard from './EmptyCard';

export default class GameGridV2 extends React.Component {

    render() {
        return (
            <div style={containerAll}>
                <div style={container}>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>

                </div>
                <div style={container}>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>

                </div>
                <div style={container}>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>
                    <EmptyCard/>

                </div>
            </div>
        )
    }


}


    const containerAll = {
        padding:'200px',
        backgroundColor: "orange",
        // flex: 1,
        alignItems: "center", // ignore this - we'll come back to it
        justifyContent: "center", // ignore this - we'll come back to it
        flexDirection: "row",
        display:'flex',
  
    };
    const container = {
        backgroundColor: "grey",
        // flex: 1,
        alignItems: "center", // ignore this - we'll come back to it
        justifyContent: "center", // ignore this - we'll come back to it
        flexDirection: "column",
    };

    const cell = {
        backgroundColor: "#A1C7E0",
        // flex: 1,
        alignItems: "center", // ignore this - we'll come back to it
        justifyContent: "center", // ignore this - we'll come back to it
    };
