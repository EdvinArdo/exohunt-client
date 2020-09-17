import React from 'react';
import Map from "./Map";
import {openWebSocket} from "./websocket";
import {handleKeyEvent} from "./keyEventHandler";
import Login from "./Login";
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {loggedIn: state.loggedIn};
}

class App extends React.Component {
    componentDidMount() {
        openWebSocket();
    }

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
            }}
                 onKeyDown={handleKeyEvent}
                 tabIndex={0}>
                {this.props.loggedIn ?
                    <Map/> :
                    <Login/>}
            </div>
        );
    }
}

App = connect(mapStateToProps)(App);
export default App;
