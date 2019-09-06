import React, { Component } from 'react';
import Instructions from './Instructions'
import Game from "./Game";
import GameOver from "./GameOver";

export default class GameRoot extends Component {
  state =  {
    shouldGame: false,
    gameOver: false,
    score: 0
  }
  render() {
    if (this.state.shouldGame) return <Game gameOver={score => { this.setState({ score: score }, () => { this.setState({ gameOver: true, shouldGame: false}) }) }}  />
    if (this.state.gameOver) return <GameOver score={this.state.score} />
    return (
      <Instructions startGame={() => { this.setState({ shouldGame: true }) }} />
    )
  }
}