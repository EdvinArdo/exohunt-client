import {move} from "./websocket";
import store, {animateMoveStore} from "./store";

const keyToDirection = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
}

export function handleKeyEvent(event) {
    const direction = keyToDirection[event.key];
    const state = store.getState();
    if (direction && state.moving.animationDone && state.moving.serverDone) {
        move(direction);
        store.dispatch(animateMoveStore(direction));
    }
}
