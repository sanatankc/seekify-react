import React, { Component } from 'react'
import { tween, styler, easing, keyframes, physics } from 'popmotion'
import './Star.css'
import { ReactComponent as StarSVG } from './Star.svg'
import mapScale from './mapScale'
import { getRandomInt } from './Game';

const convertRadian = angle => angle * Math.PI / 180

class Star extends Component {
  starSize = mapScale(
    {
      from: [1920, 375],
      to: [this.props.star.property.starSize, 22 / 60 * this.props.star.property.starSize]
    },
    window.innerWidth
    )
    isAnimating = true
    isBlinking = false
    blinkAnimated = {}
    blinkAnimation = keyframes({ values: [0, 1, 0], duration: 300, flip: Infinity })

    componentDidMount() {
      const elem = document.getElementById(this.props.id)
      this.star = styler(elem)
      this.x = 0
      this.y = -this.starSize
      this.innerHeight = window.innerHeight
      this.velocityPerFrame = (this.innerHeight / (this.props.star.property.duration / 1000)) / 60
      this.angle = this.props.star.property.angularMovement ? [getRandomInt(30, 70), getRandomInt(110, 150)][getRandomInt(0, 1)] : 90
      this.dx = Math.cos(convertRadian(this.angle)) * this.velocityPerFrame
      this.dy = Math.sin(convertRadian(this.angle)) * this.velocityPerFrame
      this.animate()
    }

    animate = () => {
      let {
        star,
        isAnimating,
        x,
        y,
        dx,
        dy,
        angle,
        props,
        starSize,
        isBlinking,
        blinkAnimated,
        blinkAnimation,
        innerHeight
      } = this

      if (isAnimating) {
        star.set('y', y)
        star.set('x', x)

        if (y > innerHeight - 40 - (starSize + props.paddleHeight)) {

          if (props.shouldCollectedByPaddle(props.star.pos + x, x + props.star.pos + starSize * props.star.count)) {
            this.isAnimating = false
            window.cancelAnimationFrame(this.animate)
            props.collectStar(props.star.property.score * props.star.count)
            tween({ from: 1, to: 0, duration: 400, ease: easing.anticipate }).start(o => {
              star.set({'opacity': o})
            })
          }
        }

        if (y >= innerHeight - starSize) {
          this.isAnimating = false
          window.cancelAnimationFrame(this.animate)
          setTimeout(() => {
            this.props.gameOver()
          }, 200)
        }

        // bounce
        if (
          (x + props.star.pos) > window.innerWidth - (starSize * props.star.count) ||
          (x + props.star.pos) < 0
        ) {
          this.angle = 180 - angle
          this.dx = Math.cos(convertRadian(this.angle)) * this.velocityPerFrame
          this.dy = Math.sin(convertRadian(this.angle)) * this.velocityPerFrame
        }

        this.x += this.dx
        this.y += this.dy
        this.animationLoop = requestAnimationFrame(this.animate)
      }
    }

    render() {
      const { props, starSize } = this
      return (
        <div style={{ position: 'absolute', left: props.star.pos, display: 'flex', transform: `translateY(-${starSize})px` }} id={props.id}>
          {Array.from('_'.repeat(props.star.count)).map((_, i) => (
            <div style={{ width: starSize, height: starSize}} key={props.star.key + i}>
              <StarSVG className={`${props.star.property.name}-star`} />
            </div>
          ))}
        </div>
      )
    }
}

export default Star