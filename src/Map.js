import React from 'react';
import {loadImages} from "./images";
import {tiles} from "./tiles";
import {connect} from "react-redux";
import store, {animateMoveFinishStore} from "./store";

const TILE_WIDTH = 64;
const TILE_HEIGHT = 64;

const MAP_WIDTH = 15 + 2;
const MAP_HEIGHT = 11 + 2;

const MOVING_ANIMATION_FRAMES = 20;

const mapStateToProps = state => {
    return {
        map: state.map,
        x: state.char.location.x - ((MAP_WIDTH - 1) / 2),
        y: state.char.location.y - ((MAP_HEIGHT - 1) / 2),
        moving: state.moving,
    };
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.canvas = React.createRef();
        this.gameLoop = this.gameLoop.bind(this);
        this.init = this.init.bind(this);
        this.startAnimation = this.startAnimation.bind(this);
        this.stepAnimation = this.stepAnimation.bind(this);
        this.finishAnimation = this.finishAnimation.bind(this);
    }

    async componentDidMount() {
        const images = await loadImages(Object.values(tiles));
        this.setState({images: images});
        this.init();
        window.requestAnimationFrame(this.gameLoop);
    }

    init() {
        this.moving = false;
        this.movingAnimation = 0;
        this.map = this.props.map;
        this.x = this.props.x;
        this.y = this.props.y;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    gameLoop() {
        const context = this.canvas.current.getContext('2d');

        this.stepAnimation();

        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, MAP_WIDTH * TILE_WIDTH, MAP_HEIGHT * TILE_HEIGHT);

        for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                context.drawImage(this.state.images[tiles[this.map.get(y + this.y).get(x + this.x)]], (x - 1) * TILE_WIDTH + Math.floor(this.offsetX), (y - 1) * TILE_HEIGHT + Math.floor(this.offsetY), TILE_WIDTH, TILE_HEIGHT);
            }
        }

        window.requestAnimationFrame(this.gameLoop);
    }

    startAnimation() {
        this.moving = true;
    }

    stepAnimation() {
        if (this.moving) {
            const animationProgress = this.movingAnimation / MOVING_ANIMATION_FRAMES;
            if (this.props.moving.direction === 'left') {
                this.offsetX = TILE_WIDTH * animationProgress;
            } else if (this.props.moving.direction === 'right') {
                this.offsetX = -TILE_WIDTH * animationProgress;
            } else if (this.props.moving.direction === 'up') {
                this.offsetY = TILE_HEIGHT * animationProgress;
            } else if (this.props.moving.direction === 'down') {
                this.offsetY = -TILE_HEIGHT * animationProgress;
            }

            if (this.movingAnimation >= MOVING_ANIMATION_FRAMES) {
                this.finishAnimation();
            } else {
                this.movingAnimation += 1;
            }
        }
    }

    finishAnimation() {
        store.dispatch(animateMoveFinishStore(this.props.moving.direction));
        this.moving = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.moving !== this.props.moving && !this.props.moving.animationDone && !this.props.moving.serverDone) {
            this.startAnimation();
        } else if (this.props.moving.animationDone && this.props.moving.serverDone) {
            this.init();
        }
    }

    render() {
        return (
            <canvas width={(MAP_WIDTH - 2) * TILE_WIDTH}
                    height={(MAP_HEIGHT - 2) * TILE_HEIGHT}
                    ref={this.canvas}>
            </canvas>
        );
    }
}

Map = connect(mapStateToProps)(Map);
export default Map;
