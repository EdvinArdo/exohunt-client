import store, {queueMoveStore} from "./store";

const keyToDirection = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
}

export function handleKeyEvent(event) {
    const direction = keyToDirection[event.key];
    if (direction) {
        store.dispatch(queueMoveStore(direction));
    }
}
