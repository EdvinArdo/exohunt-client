import React from 'react';
import {loadImages} from "./images";
import {tiles} from "./tiles";
import {connect} from "react-redux";

const tile = {
    width: 64,
    height: 64,
};

const map = {
    width: 15,
    height: 11,
};

const mapStateToProps = state => {
    return {
        map: state.map,
        x: state.char.location.x - ((map.width - 1) / 2),
        y: state.char.location.y - ((map.height - 1) / 2),
    };
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.canvas = React.createRef();
    }

    async componentDidMount() {
        const images = await loadImages(Object.values(tiles));
        this.setState({images: images});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.images) {
            return;
        }
        const context = this.canvas.current.getContext('2d');
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {
                context.drawImage(this.state.images[tiles[this.props.map.get(y + this.props.y).get(x + this.props.x)]], x * tile.width, y * tile.height, tile.width, tile.height);
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

Map = connect(mapStateToProps)(Map);
export default Map;
