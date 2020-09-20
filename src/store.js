import {createStore} from "redux";
import {Map} from 'immutable';

const store = createStore(loginReducer);
export default store;

function loginReducer(state = {
                          loggedIn: false,
                          sessID: null,
                          char: null,
                          map: Map(),
                      },
                      action) {
    const payload = action.payload;
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loggedIn: true,
                sessID: payload.sessID,
                account: payload.account,
            };
        case 'LOGOUT':
            return {
                ...state,
                loggedIn: false,
            };
        case 'LOGIN_CHAR':
            return {
                ...state,
                char: payload,
            };
        case 'MAP':
            let map = state.map;
            payload.map.forEach((row, dy) => {
                const y = dy + payload.y;
                let mapRow = map.get(y);
                if (!mapRow) {
                    mapRow = Map();
                }
                row.forEach((tile, dx) => {
                    const x = dx + payload.x;
                    mapRow = mapRow.set(x, tile);
                });
                map = map.set(y, mapRow);
            });
            return {
                ...state,
                map: map,
            };
        case 'LOGOUT_CHAR':
            return {
                ...state,
                char: null,
            };
        case 'MOVE':
            return {
                ...state,
                char: {
                    ...state.char,
                    location: payload,
                },
            };
        default:
            return state;
    }
}

export function loginStore(payload) {
    return {type: 'LOGIN', payload: payload};
}

export function loginCharStore(payload) {
    return {type: 'LOGIN_CHAR', payload: payload};
}

export function moveStore(payload) {
    return {type: 'MOVE', payload: payload};
}

export function mapStore(payload) {
    return {type: 'MAP', payload: payload};
}
