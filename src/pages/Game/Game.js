import React, { Component } from "react";
import mapScale from './mapScale'
import "./Game.css";
import Star from "./Star";
import { TaskTimer } from 'tasktimer'
import Hammer from 'hammerjs'
import TimeAndScore from './TimeAndScore'

export function getRandomInt(min, max) {
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
  currentPaddleTransform = 0;
  paddleHeight = mapScale(
    {
      from: [1920, 375],
      to: [24, 16]
    },
    window.innerWidth
  )
  paddleWidth =  mapScale(
    {
      from: [1920, 375],
      to: [400, 152]
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
    { name: 'red', score: 500, starSize: 60 },
    { name: 'yellow', score: 400, starSize: 80 },
    { name: 'blue', score: 300, starSize: 88 },
    { name: 'green', score: 200, starSize: 105 },
    { name: 'pink', score: 100, starSize: 121 },
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
    window.addEventListener("touchmove", e => {
      let { clientX } = e.touches[0];
      if (clientX > window.innerWidth - paddleWidth / 2)
        clientX = window.innerWidth - paddleWidth;
      else if (clientX < paddleWidth / 2) clientX = 0;
      else clientX = clientX - paddleWidth / 2;
      this.currentPaddleTransform = clientX;
      paddle.style.transform = `translateX(${this.currentPaddleTransform}px)`;
    });

    window.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") {
        this.currentPaddleTransform = this.currentPaddleTransform - (paddleWidth / 2);
        if (this.currentPaddleTransform <= 0) this.currentPaddleTransform = 0;
        paddle.style.transform = `translateX(${this.currentPaddleTransform}px)`;
      }
      if (e.key === "ArrowRight") {
        this.currentPaddleTransform = this.currentPaddleTransform + (paddleWidth / 2);
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

    const hammer = new Hammer(document.querySelector('.game-container'))
    hammer.on('pan', (evt) => {
      console.log(evt)
    })
    this.startTimer()
  }

  getDuration(tick) {
    if (tick < 10) {
      return 4000
    } else if (tick > 10) {
      return 2000
    }
  }
  startTimer() {
    this.timer = new TaskTimer(1000);
    const blackListTicks = [10, 11, 29, 30]
    this.timer.on('tick', () => {
      const star = this.starProperties[getRandomInt(0, 4)]
      const starSize = mapScale(
      {
        from: [1920, 375],
        to: [star.starSize, 22 / 60 * star.starSize]
      },
        window.innerWidth
      )
      const starCount = [1,1,1,1,1,1,2,2,3,3][getRandomInt(0,9)]
      this.setState({ tick: this.timer.tickCount })
      if (this.timer.tickCount === 30) {
        this.timer.stop()
      }
      if (!blackListTicks.includes(this.timer.tickCount)) {
        const pos = getRandomInt(0, window.innerWidth - starSize * starCount)
        this.setState(prev => ({
          stars:
          [...prev.stars, {
            key: this.timer.tickCount,
            pos,
            property: {
              ...star,
              duration: this.getDuration(this.timer.tickCount),
              angularMovement: this.timer.tickCount > 18
            },
            count: starCount
          }]
        }))
      }
    });
    this.timer.start()
  }

  collectStar = score => {
    this.setState(prev => ({ score: prev.score + score }))
  }

  gameOver = () => {
    this.props.gameOver(this.state.score)
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
      <div className="game-container" style={{ width: '100%', height: window.innerHeight }}>
        <div className="stars-overlay" style={{ width: '100%', height: window.innerHeight }} >
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
            gameOver={this.gameOver}
            collectStar={this.collectStar}
          />
        ))}
        </div>
        <div className="paddle-overlay" style={{ width: '100%', height: window.innerHeight }}>
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
