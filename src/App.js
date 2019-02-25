import React, { Component } from 'react';
import './App.css';

import Board from './board'


class App extends Component {
  render() {
    return (
      <Board knightPosition={[5, 5]}/>
    );
  }
}

export default App;
