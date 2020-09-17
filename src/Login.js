import React from 'react';
import {tryLogin} from "./websocket";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        tryLogin();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/*<input type='text'*/}
                {/*       value={this.state.username}*/}
                {/*       onChange={event => this.setState({username: event.target.value})}/>*/}
                {/*<input type='password'*/}
                {/*       value={this.state.password}*/}
                {/*       onChange={event => this.setState({password: event.target.value})}/>*/}
                <input type='submit'
                       value='Login'/>
            </form>
        );
    }
}
