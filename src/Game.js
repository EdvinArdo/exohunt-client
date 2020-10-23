import React from 'react';
import {loadImages} from "./images";
import {tiles} from "./tiles";
import {webSocketHost} from "./config";

const W3CWebSocket = require('websocket').w3cwebsocket;

const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;

const MAP_WIDTH = 15 + 2;
const MAP_HEIGHT = 11 + 2;


const KEY_TO_DIRECTION = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.canvas = React.createRef();

        this.gameLoop = this.gameLoop.bind(this);
        this.draw = this.draw.bind(this);
        this.openWebSocket = this.openWebSocket.bind(this);
        this.handleKeyEvent = this.handleKeyEvent.bind(this);
        this.sendOnWebSocket = this.sendOnWebSocket.bind(this);
        this.sendMove = this.sendMove.bind(this);
        this.animateMove = this.animateMove.bind(this);
        this.isMoving = this.isMoving.bind(this);
        this.updateAnimations = this.updateAnimations.bind(this);
        this.offsetX = 0;
        this.offsetY = 0;
    }

    async componentDidMount() {
        const images = await loadImages(tiles);
        this.setState({images: images});
        this.openWebSocket();
        window.requestAnimationFrame(this.gameLoop);
    }

    openWebSocket() {
        this.ws = new W3CWebSocket(`ws://${webSocketHost}`, 'exohunt-protocol');

        this.ws.onerror = error => {
            console.error('Connection Error:', error);
        };

        this.ws.onmessage = messageJSON => {
            const message = JSON.parse(messageJSON.data);

            this.map = message.map;
            this.character = message.character;
            if (message.events) {
                // console.log(message.events[0].direction);
                this.animateMove(message.events[0].direction)
            }
        };
    }

    gameLoop() {
        if (this.map) {
            this.updateAnimations();
            this.draw();
        }
        window.requestAnimationFrame(this.gameLoop);
    }

    handleKeyEvent(event) {
        const direction = KEY_TO_DIRECTION[event.key];
        if (direction) {
            this.sendMove(direction);
        }
    }

    sendOnWebSocket(message) {
        if (!this.ws) {
            throw new Error('Websocket has not been opened');
        }
        this.ws.send(JSON.stringify(message));
    }

    sendMove(direction) {
        const message = {
            event: 'move',
            data: {
                direction: direction,
            },
        };
        this.sendOnWebSocket(message);
    }

    animateMove(direction) {
        if (direction === "left") {
            this.offsetX = -TILE_WIDTH;
        } else if (direction === "right") {
            this.offsetX = TILE_WIDTH;
        } else if (direction === "up") {
            this.offsetY = -TILE_HEIGHT;
        } else if (direction === "down") {
            this.offsetY = TILE_HEIGHT;
        }
    }

    updateAnimations() {
        if (Math.abs(this.offsetX) < 2.5) {
            this.offsetX = 0;
        }
        if (Math.abs(this.offsetY) < 2.5) {
            this.offsetY = 0;
        }


        if (this.offsetX > 0) {
            this.offsetX -= 2.5;
        }
        if (this.offsetX < 0) {
            this.offsetX += 2.5;
        }
        if (this.offsetY > 0) {
            this.offsetY -= 2.5;
        }
        if (this.offsetY < 0) {
            this.offsetY += 2.5;
        }
    }

    isMoving() {
        return this.offsetX !== 0 || this.offsetY !== 0;
    }

    draw() {
        const context = this.canvas.current.getContext('2d');
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, MAP_WIDTH * TILE_WIDTH, MAP_HEIGHT * TILE_HEIGHT);

        // Draw map
        for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                const tile = this.map[y][x];
                context.drawImage(this.state.images[tile.id], (x - 1) * TILE_WIDTH + Math.floor(this.offsetX), (y - 1) * TILE_HEIGHT + Math.floor(this.offsetY), TILE_WIDTH, TILE_HEIGHT);
                if (typeof tile.entity === "number" && tile.entity !== this.character.id) {
                    context.fillRect((x - 1) * TILE_WIDTH + Math.floor(this.offsetX), (y - 1) * TILE_HEIGHT + Math.floor(this.offsetY), TILE_WIDTH, TILE_HEIGHT);
                }
            }
        }

        // Draw self
        context.fillRect(((MAP_WIDTH - 3) / 2) * TILE_WIDTH, ((MAP_HEIGHT - 3) / 2) * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT)
    }

    render() {
        return (
            <canvas width={(MAP_WIDTH - 2) * TILE_WIDTH}
                    height={(MAP_HEIGHT - 2) * TILE_HEIGHT}
                    ref={this.canvas}
                    onKeyDown={this.handleKeyEvent}
                    tabIndex={0}>
            </canvas>
        );
    }
}

export default Game;
