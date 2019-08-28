import React, { Component } from "react";
import mapScale from './mapScale'
import "./Game.css";
import Star from "./Star";
import { TaskTimer } from 'tasktimer'
import TimeAndScore from './TimeAndScore'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Game extends Component {
  state = {
    stars: [],
    tick: 0,
    score: 0
  }
  nextKey = 0
  currentPaddleTransform = 0;
  paddleHeight = mapScale(
    {
      from: [1920, 375],
      to: [30, 16]
    },
    window.innerWidth
  )
  paddleWidth =  mapScale(
    {
      from: [1920, 375],
      to: [656, 152]
    },
    window.innerWidth
  )
  paddleBorderRadius = (mapScale(
    {
      from: [1920, 375],
      to: [656, 152]
    },
    window.innerWidth
  ) / 152) * 8
  starProperties = [
    { name: 'red', score: 500 },
    { name: 'yellow', score: 400 },
    { name: 'blue', score: 300 },
    { name: 'green', score: 200 },
    { name: 'pink', score: 100 },

  ]

  componentDidMount() {
    const { paddleWidth } = this
    const paddle = document.querySelector(".paddle");
    window.addEventListener("mousemove", e => {
      let { clientX } = e;
      if (clientX > window.innerWidth - paddleWidth / 2)
        clientX = window.innerWidth - paddleWidth;
      else if (clientX < paddleWidth / 2) clientX = 0;
      else clientX = clientX - paddleWidth / 2;
      this.currentPaddleTransform = clientX;
      paddle.style.transform = `translateX(${this.currentPaddleTransform}px)`;
    });
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") {
        this.currentPaddleTransform = this.currentPaddleTransform - 50;
        if (this.currentPaddleTransform <= 0) this.currentPaddleTransform = 0;
        paddle.style.transform = `translateX(${this.currentPaddleTransform}px)`;
      }
      if (e.key === "ArrowRight") {
        this.currentPaddleTransform = this.currentPaddleTransform + 50;
        if (this.currentPaddleTransform > window.innerWidth - paddleWidth)
          this.currentPaddleTransform = window.innerWidth - paddleWidth;
        paddle.style.transform = `translateX(${this.currentPaddleTransform}px)`;
      }
    });

    window.addEventListener('focus', () => {
      if (this.timer && this.timer.state === 'paused') {
        this.timer.resume()
        console.log('focus', this.timer.state)
      }
    })
    window.addEventListener('blur', () => {
      if (this.timer && this.timer.state === 'running') {
        this.timer.pause()
        console.log('blur', this.timer.state)
      }
    })
    this.startTimer()
  }

  startTimer() {
    const starSize = mapScale(
    {
      from: [1920, 375],
      to: [60, 22]
    },
    window.innerWidth
  )
    this.timer = new TaskTimer(1000);
    this.timer.on('tick', () => {
      this.setState({ tick: this.timer.tickCount })
      if (this.timer.tickCount === 60) this.timer.stop()
      if (this.timer.tickCount % 2 === 1 && this.timer.tickCount < 56) {
        const pos = getRandomInt(0, window.innerWidth - starSize * 3)
        this.setState(prev => ({
          stars:
          [...prev.stars, {
            key: this.nextKey,
            pos,
            property: this.starProperties[getRandomInt(0, 4)],
            count: [getRandomInt(1,3)]
          }]
        }))
        this.nextKey += 1
      }
    });
    this.timer.start()
  }

  collectStar = score => {
    this.setState(prev => ({ score: prev.score + score }))
  }
  shouldCollectedByPaddle = (starY1, starY2) => {
    // On paddle
    if (starY1 >= this.currentPaddleTransform && starY2 <= this.currentPaddleTransform + this.paddleWidth) {
      return true
    }
    // // right edge
    if (starY1 >= this.currentPaddleTransform && starY1 <= this.currentPaddleTransform + this.paddleWidth && starY2 <= this.currentPaddleTransform + this.paddleWidth + (starY2 - starY1)) {
      return true
    }
    // // left edge
    if (starY1 <= this.currentPaddleTransform && starY2 >= this.currentPaddleTransform) {
      return true
    }

    return false
  }

  render() {
    return (
      <div className="container">
        <div className="stars-overlay">
        {this.state.stars.map(star => (
          <Star
            paddleHeight={
              mapScale(
                {
                  from: [1920, 375],
                  to: [30, 16]
                },
                window.innerWidth
            )}
            shouldCollectedByPaddle={this.shouldCollectedByPaddle}
            key={star.key}
            star={star}
            id={`star-${star.key}`}
            collectStar={this.collectStar}
          />
        ))}
        </div>
        <div className="paddle-overlay">
          <div
            className="paddle"
            style={{
              width: this.paddleWidth,
              height: this.paddleHeight,
              borderRadius: this.paddleBorderRadius
            }}
          />
        </div>
        <TimeAndScore tick={this.state.tick} score={this.state.score} />
      </div>
    );
  }
}

export default Game;
