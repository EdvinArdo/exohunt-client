import React from 'react';
import {tryLogin} from "./websocket";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        tryLogin(this.state.username, this.state.password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text'
                       value={this.state.username}
                       onChange={event => this.setState({username: event.target.value})}/>
                {/*<input type='password'*/}
                {/*       value={this.state.password}*/}
                {/*       onChange={event => this.setState({password: event.target.value})}/>*/}
                <input type='submit'
                       value='Login'/>
            </form>
        );
    }
}
