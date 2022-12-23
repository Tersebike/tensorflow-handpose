import React, { useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import './App.css';
import { drawHand } from './utilities'

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log(webcamRef.current.video.height)
    setInterval(() => {
      detect(net)
    }, 100)
  }

  const detect = async (net) => {
    if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      webcamRef.current.video.width = 640;
      webcamRef.current.video.height = 480;
      canvasRef.current.width = 640;
      canvasRef.current.height = 480;
      const hand = await net.estimateHands(webcamRef.current.video);
      const ctx = canvasRef.current.getContext('2d');
      drawHand(hand, ctx);
    }
  }

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef}
        style={{
          position: 'absolute',
          marginRight: 'auto',
          marginLeft: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 640,
          height: 480,
        }}
        />
        <canvas ref={canvasRef}
        style={{
          position: 'absolute',
          marginRight: 'auto',
          marginLeft: 'auto',
          left: 0,
          right: 0,
          textAlign: 'center',
          zindex: 9,
          width: 640,
          height: 480,
        }}
        />
      </header>
    </div>
  );
}

export default App;
