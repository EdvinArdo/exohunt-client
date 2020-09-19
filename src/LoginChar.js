import React from 'react';
import {connect} from "react-redux";
import {loginChar} from "./websocket";

const mapStateToProps = state => {
    return {
        characters: Object.keys(state.account.characters),
    };
}

class CharLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charName: props.characters.length === 0 ? '' : props.characters[0],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        loginChar(this.state.charName);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <select>
                    {this.props.characters.map(charName =>
                        <option key={charName}
                                value={charName}>
                            {charName}
                        </option>)}
                </select>
                <input type='submit'
                       value='Enter game'/>
            </form>
        );
    }
}

CharLogin = connect(mapStateToProps)(CharLogin);
export default CharLogin;
