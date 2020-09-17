import store, {login} from "./store";

const W3CWebSocket = require('websocket').w3cwebsocket;
let client;

export function openWebSocket() {
    client = new W3CWebSocket('ws://localhost:8080/', 'exohunt-protocol');

    client.onerror = error => {
        console.log('Connection Error:', error);
    };

    client.onmessage = message => {
        const data = JSON.parse(message.data);
        if (data.type === 'error') {
            console.error(data.error);
        } else {
            if (data.type === 'event') {
                if (data.event === 'login') {
                    store.dispatch(login(data.status));
                } else {
                    console.error('Unknown event:', data.event);
                }
            } else {
                console.error('Unknown type:', data.type);
            }
        }
    };
}

export function sendOnWebSocket(data) {
    if (!client) {
        throw 'Websocket has not been opened';
    }
    client.send(JSON.stringify(data));
}

export function tryLogin() {
    const data = {
        type: 'event',
        event: 'login',
    };
    sendOnWebSocket(data);
}
