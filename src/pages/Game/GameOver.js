import React, { Component } from 'react'
import { ReactComponent as RoundedStarBG} from './RoundedStarBG.svg'
import { ReactComponent as Star} from './Star.svg'
import debounce from '../../debounce'
import mapScale from './mapScale'
import './Star.css'


const minCap = (num, cap) => (num > cap ? num : cap)
const maxCap = (num, cap) => (num < cap ? num : cap)


export default class GameOver extends Component {
  state = {
    styles: styles()
  }

  componentDidMount() {
    window.addEventListener('resize', debounce(() => {
      this.setState({styles: styles()})
      console.log('log')
    }), 50)
  }

  render() {
    const { styles } = this.state
    return (
      <div style={styles.container}>
        <div style={styles.bgAbsoluteContainer}>
          <div style={styles.bgWrapper}>
            <RoundedStarBG />
          </div>
        </div>
        <div style={styles.youAreText}>You are</div>
        <div style={styles.seekified}>SEEKIFIED</div>
        <div style={styles.scoreLabel}>you have scored</div>
        <div style={styles.score}>{this.props.score}</div>
        <div style={styles.description}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magnaaliquam erat</div>
        <div style={styles.inputContainer}>
          <input style={styles.input} type='text' placeholder='Enter your email id' />
          <div style={styles.submitContainer} className='submit-button'>
            <div style={styles.submitIconWrapper}>
              <Star className='stroke-star' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = () => {
  const inputWidth = minCap((475 / 1920) * window.innerWidth, 280)
  return {
    container: {
      width: '100%',
      height: window.innerHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    bgAbsoluteContainer: {
      position: 'absolute',
      width: '100%',
      height: window.innerHeight,
      overflow: 'hidden',
      zIndex: -1,
    },
    bgWrapper: {
      position: 'absolute',
      width: minCap(window.innerWidth, 1100),
      height: minCap(window.innerWidth, 1100),
      top: maxCap(((minCap(window.innerWidth, 1100) - window.innerHeight) / 2) * -1, 0),
      left: maxCap((minCap(window.innerWidth, 1100) - window.innerWidth) / 2 * -1, 0),
      background: '#140828',
    },
    youAreText: {
      fontFamily: 'Calibre',
      fontSize: minCap((70 / 1920) * window.innerWidth, 30),
      color: '#fff'
    },
    seekified: {
      fontFamily: 'Calibre',
      fontSize: minCap((80 / 1920) * window.innerWidth, 36),
      fontWeight: 'medium',
      color: '#fff',
      position: 'relative',
      top: minCap((80 / 1920) * window.innerWidth, 36) * 0.4 * -1
    },
    scoreLabel: {
      fontFamily: 'Calibre',
      fontSize: minCap((25 / 1920) * window.innerWidth, 14),
      color: 'white'
    },
    score: {
      fontFamily: 'Calibre',
      fontWeight: 'medium',
      color: 'white',
      fontSize: minCap((114 / 1920) * window.innerWidth, 48),
    },
    description: {
      color: '#fff',
      fontFamily: 'Calibre',
      fontSize: minCap((24 / 1920) * window.innerWidth * 0.6, 14),
      width: minCap((475 / 1920) * window.innerWidth * 0.6, 300),
      textAlign: 'center'
    },
    inputContainer: {
      width: inputWidth,
      height: (inputWidth / 475) * 89,
      borderRadius: (inputWidth / 475) * 44,
      border: '1px solid #89878F',
      marginTop: 30,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    },
    submitContainer: {
      width: (inputWidth / 475) * 75,
      height: (inputWidth / 475) * 75,
      border: '1px solid #89878F',
      borderRadius: '50%',
      marginRight: 6,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitIconWrapper: {
      width: '80%',
      height: '80%'
    },
    input: {
      flex: 1,
      height: '100%',
      padding: (inputWidth / 475) * 30,
      paddingRight:(inputWidth / 475) * 7,
      fontSize: minCap((inputWidth / 475) * 24, 16),
      background: 'transparent',
      border: 'none',
      backgroundImage: 'none',
      backgroundColor:'transparent',
      boxShadow: 'none',
      outline: 'none',
      color: '#fff'
    }
  }
}