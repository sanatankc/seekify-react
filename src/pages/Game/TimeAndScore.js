import React, { Component } from 'react'
import './TimeAndScore.css'

const scale = (number, scale = 1, cap, base = 1920) => {
  const size = (window.innerWidth / base * scale) * number
  if (size < cap) return cap
  return size
}

class TimeAndScore extends Component {
  render() {
    const tick = this.props.tick.toString().length === 1
      ? `0${this.props.tick}`
      : this.props.tick.toString()
    const tickText = tick === '60' ? '01:00' : `00:${tick}`
    return (
      <div className='time-and-score-overlay'>
        <div style={styles.topContainer}>
          <div style={styles.timeOrScoreBoxStyle}>
            <span style={styles.text}>{tickText}</span>
          </div>
          <div style={styles.timeOrScoreBoxStyle}>
            <span style={styles.text}>{this.props.score}</span>
          </div>
        </div>
      </div>
    )
  }
}
const styles = {
  timeOrScoreBoxStyle: {
    width: scale(215, 1, 100),
    height: scale(90, 1, 40),
    borderRadius: scale(10, 1, 5),
    fontSize: scale(60, 1, 26),
    backgroundColor: '#2C1058',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Calibre',
  },
  topContainer:  {
    width: '100%',
    padding: scale(45, 1, 20),
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between'
  },
  text: {
    position: 'relative',
    top: scale(7, 1, 4)
  }
}
export default TimeAndScore
