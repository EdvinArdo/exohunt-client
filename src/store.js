import {createStore} from "redux";

const store = createStore(loginReducer);

export default store;

function loginReducer(state = {loggedIn: false}, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loggedIn: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                loggedIn: false,
            }
        default:
            return state
    }
}

export function login(payload) {
    return {type: 'LOGIN', payload: payload};
}
