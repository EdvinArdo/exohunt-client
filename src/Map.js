import React from 'react';
import {loadImages} from "./images";

const tile = {
    width: 64,
    height: 64,
};

const map = {
    width: 15,
    height: 11,
};

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        const tiles = new Array(map.width).map(row => new Array(map.height));
        this.state = {
            tiles: tiles,
        };
        this.canvas = React.createRef();
    }

    async componentDidMount() {
        const context = this.canvas.current.getContext('2d');
        const images = await loadImages(['grass']);

        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                context.drawImage(images['grass'], x * tile.width, y * tile.height, tile.width, tile.height);
            }
        }
    }

    render() {
        return (
            <canvas width={map.width * tile.width}
                    height={map.height * tile.height}
                    ref={this.canvas}>
            </canvas>
        );
    }
}
