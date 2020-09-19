import {move} from "./websocket";

const keyToDirection = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
}

export function handleKeyEvent(event) {
    if (keyToDirection[event.key]) {
        move(keyToDirection[event.key]);

    }
}
