import React from 'react';
import NowPlaying from "./components/NowPlaying";
import LoginButton from "./components/LoginButton";
import './App.css';

function App() {
    return (
      <div className="App">
        <LoginButton />
        <NowPlaying />
      </div>
    );
  }


export default App;
