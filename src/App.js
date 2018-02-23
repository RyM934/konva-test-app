import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Stage, Layer, Rect, Image } from 'react-konva';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rectX: 0,
      rectY: 0,
      scale: 1
    };

    this.stageRef = null;
    this.setStageRef = this.setStageRef.bind(this);
    this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
    this.handleOnMouseWheel = this.handleOnMouseWheel.bind(this);
  }

  componentDidMount() {
    const that = this;
    const image = new window.Image();
    image.src =
      'https://upload.wikimedia.org/wikipedia/commons/6/63/A_large_blank_world_map_with_oceans_marked_in_blue.svg';
    image.onload = () => {
      that.setState({
        image: image
      });
    };

    this.stageRef.on('mousemove', this.handleOnMouseWheel);
    this.stageRef.on('wheel', this.handleOnMouseWheel);
  }

  handleOnMouseMove(e) {
    const { evt: { clientX, clientY } } = e;

    this.setState({
      rectX: clientX,
      rectY: clientY
    });
  }

  handleOnMouseWheel() {
    const { scale } = this.state;

    this.setState({
      scale: (scale * 1.2) % 6
    });
  }

  setStageRef(ref) {
    if (ref) {
      this.stageRef = ref._stage;
    }
  }

  render() {
    const { rectX, rectY, scale, image } = this.state;

    return (
      <div className="App">
        <Stage
          ref={this.setStageRef}
          scaleX={scale}
          scaleY={scale}
          height={1000}
          width={1000}
        >
          <Layer>
            <Rect height={1000} width={1000} />
            <Image image={image} height={800} width={800} />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;
