import {createStore} from "redux";

const store = createStore(loginReducer);

export default store;

function loginReducer(state = {
                          loggedIn: false,
                          sessID: null,
                          char: null,
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
                char: payload.char,
                map: payload.map.map,
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
                    location: payload.location,
                },
                map: payload.map.map,
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
