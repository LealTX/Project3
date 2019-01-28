import React from 'react';
import NowPlaying from "./components/NowPlaying";
import SearchContainer from "./components/SearchContainer";
import LoginButton from "./components/LoginButton";
import './App.css';

function App() {
    return (
      <div className="App">
        <LoginButton />
        <NowPlaying />
        <SearchContainer />
      </div>
    );
  }


export default App;
