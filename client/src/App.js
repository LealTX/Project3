import React from 'react';
import LoginButton from "./components/LoginButton";
import Queued from "./components/Queued";
import Main from "./pages/Main";
import './App.css';

function App() {
    return (
      <div className="App">
        <LoginButton />
        <Main />
      </div>
    );
  }


export default App;
