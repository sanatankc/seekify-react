import React from 'react'
import { tween, styler, easing, keyframes } from 'popmotion'
import './Star.css'
import { ReactComponent as StarSVG } from './Star.svg'
import mapScale from './mapScale'

const Star = props => {
  const starSize = mapScale(
    {
      from: [1920, 375],
      to: [60, 22]
    },
    window.innerWidth
  )

  React.useEffect(() => {
    const elem = document.getElementById(props.id)
    const star = styler(elem)
    const blinkAnimation = keyframes({ values: [0, 1, 0], duration: 300, flip: Infinity })
    let blinkAnimated
    let isBlinking = false
    const {innerHeight} =  window

    let movingStar = tween({from: -starSize, to: innerHeight - 40 - 2, duration: 5000, ease: easing.linear })
      .start(v => {
        star.set('y', v)
        if (v > innerHeight - 40 - (starSize + props.paddleHeight) - 100 && !isBlinking) {
          blinkAnimated = blinkAnimation.start(o => {
            star.set('opacity', o)
          })
          isBlinking = true
        }
        if (v > innerHeight - 40 - (starSize + props.paddleHeight)) {
          if (props.shouldCollectedByPaddle(props.star.pos, props.star.pos + starSize * props.star.count)) {
            blinkAnimated.stop()
            star.set('opacity', 1)
            movingStar.stop()
            props.collectStar(props.star.property.score * props.star.count)
            tween({ from: 1, to: 0, duration: 400, ease: easing.anticipate }).start(o => {
              star.set({'opacity': o})
            })
          }
        }
        if (v >= innerHeight - 40 - 2) {
          blinkAnimated.stop()
          star.set('opacity', 1)
        }

      });
  }, [])

  return (
    <div style={{ position: 'absolute', left: props.star.pos, display: 'flex', transform: `translateY(-${starSize}px)` }} id={props.id}>
      {Array.from('_'.repeat(props.star.count)).map(() => (
        <div style={{ width: starSize, height: starSize}}>
          <StarSVG className={`${props.star.property.name}-star`} />
        </div>
      ))}
    </div>
  )
}
export default Star
