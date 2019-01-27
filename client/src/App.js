import React from 'react';
import LoginButton from "./components/LoginButton";
import NowPlaying from "./components/NowPlaying";
import Playback from "./components/Playback";
import './App.css';

function App() {
    return (
      <div className="App">
        <LoginButton />
        <NowPlaying />
        <Playback />
      </div>
    );
  }


export default App;
