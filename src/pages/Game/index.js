import React, { Component } from 'react';
import Instructions from './Instructions'
import Game from "./Game";
import GameOver from "./GameOver";

export default class GameRoot extends Component {
  state =  {
    shouldGame: false,
    gameOver: false
  }
  render() {
    if (this.state.gameOver) return <GameOver />
    if (this.state.shouldGame) return <Game gameOver={() => { this.setState({ gameOver: true, shouldGame: false }) }}  />
    return (
      <Instructions startGame={() => { this.setState({ shouldGame: true }) }} />
    )
  }
}