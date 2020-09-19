import store, {loginCharStore, loginStore, moveStore} from "./store";
import {webSocketHost} from "./config";

const W3CWebSocket = require('websocket').w3cwebsocket;
let client;

export function openWebSocket() {
    client = new W3CWebSocket(`wss://${webSocketHost}`, 'exohunt-protocol');

    client.onerror = error => {
        console.log('Connection Error:', error);
    };

    client.onmessage = messageJSON => {
        const message = JSON.parse(messageJSON.data);
        if (message.status === 'error') {
            console.error(message.data);
        } else {
            if (message.event === 'login') {
                store.dispatch(loginStore(message.data));
            } else if (message.event === 'loginChar') {
                store.dispatch(loginCharStore(message.data));
            } else if (message.event === 'move') {
                store.dispatch(moveStore(message.data))
            } else {
                console.error('Unknown event:', message.event);
            }
        }
    };
}

export function sendOnWebSocket(message) {
    if (!client) {
        throw new Error('Websocket has not been opened');
    }
    client.send(JSON.stringify(message));
}

export function tryLogin(username, password) {
    const message = {
        event: 'login',
        data: {
            username: username,
            password: password,
        },
    };
    sendOnWebSocket(message);
}

export function loginChar(charName) {
    const message = {
        event: 'loginChar',
        data: {
            charName: charName,
        },
    };
    sendOnWebSocket(message);
}

export function move(direction) {
    const message = {
        event: 'move',
        data: {
            dir: direction,
        },
    };
    sendOnWebSocket(message);
}
