import React from 'react';
import Game from "./Game";

class App extends React.Component {
    render() {
        return (
            <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundColor: '#A0A0A0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Game/>
            </div>
        );
    }
}

export default App;
