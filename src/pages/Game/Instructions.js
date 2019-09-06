import React, { Component } from 'react'
import mapScale from './mapScale';
import { ReactComponent as StarSVG } from './Star.svg'
import { ReactComponent as KeyboardArrows } from './KeyboardArrows.svg'
import { ReactComponent as MouseIcon } from './MouseIcon.svg'
import debounce from '../../debounce'

export default class Instructions extends Component {
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
    const width = mapScale(
      {
        from: [1920, 375],
        to: [1126, 375]
      },
      window.innerWidth
    )

    return (
      <div style={styles.container}>
        <div style={styles.instructionWrapper}>
          <div style={styles.title}>How to play</div>
          <div style={styles.rowWrapperPadding}>
            <div style={styles.controlsWrapper}>
              {(width < 400)
                ? <div style={styles.controlImageWrapper}>
                    <div style={styles.controlImage}>
                      <KeyboardArrows />
                    </div>
                    <div style={styles.controlLabel}>Move your finger to move the slider</div>
                  </div>
                : (
                  <>
                    <div style={styles.controlImageWrapper}>
                      <div style={styles.controlImage}>
                        <KeyboardArrows />
                      </div>
                      <div style={styles.controlLabel}>Use the arrow keys to move the slider</div>
                    </div>
                    <div style={styles.orText}>or</div>
                    <div style={styles.controlImageWrapper}>
                      <div style={styles.controlImage}>
                        <MouseIcon />
                      </div>
                      <div style={styles.controlLabel}>Move the mouse to the sides</div>
                    </div>
                  </>
                )
              }
              </div>
            </div>
            <div style={{...styles.rowWrapperPadding, ...styles.rowWrapperPaddingOverride}}>
              <div style={styles.starsWrapper}>
                <div>
                  <div style={styles.starA}>
                    <StarSVG className='red-star' />
                  </div>
                  <div style={styles.starALabel}>500</div>
                </div>
                <div>
                  <div style={styles.starB}>
                    <StarSVG className='yellow-star' />
                  </div>
                    <div style={styles.starBLabel}>400</div>
                </div>
                <div>
                  <div style={styles.starC}>
                    <StarSVG className='blue-star' />
                  </div>
                    <div style={styles.starCLabel}>300</div>
                </div>
                <div>
                  <div style={styles.starD}>
                    <StarSVG className='green-star' />
                  </div>
                    <div style={styles.starDLabel}>200</div>
                </div>
                <div>
                  <div style={styles.starE}>
                    <StarSVG className='pink-star' />
                  </div>
                    <div style={styles.starELabel}>100</div>
                </div>
              </div>
            </div>
            <div style={styles.rulesText}>Each data star you collect gives you points, missing them will result </div>
            <div style={styles.playButton} className='lets-go-button' onClick={() => {
              this.props.startGame()
            }}>
              play
            </div>
          </div>
        </div>
    )
  }
}

const styles = () => {
  let width =  mapScale(
    {
      from: [1920, 375],
      to: [1126, 375]
    },
    window.innerWidth
  )
  const height = width < 400 ? '100%' : 'auto'
  const scaleToWidth = (size, scale = 1, cap) =>  {
    const scaledSize = width / 1126 * size * scale
    return scaledSize < cap ? cap : scaledSize
  }
  return {

      container: {
        width: '100%',
        height: window.innerHeight,
        backgroundColor: '#140828',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      instructionWrapper: {
        width: width < 400 ? '100%' : width,
        height: height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#272333',
        borderRadius: width < 400 ? 0 : 15
      },
      title: {
        color: '#fff',
        fontFamily: 'Calibre',
        fontSize: scaleToWidth(36, 1.2, 24),
        marginTop: scaleToWidth(40, 1, 20)
      },
      controlsWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      },
      starsWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },
      rowWrapperPadding: {
        paddingRight: scaleToWidth(90),
        paddingLeft: scaleToWidth(90),
        width: '100%',
        boxSizing: 'border-box',
        marginTop: scaleToWidth(66)
      },
      rowWrapperPaddingOverride: {
        paddingRight: scaleToWidth(90),
        paddingLeft: scaleToWidth(90),
        marginTop: scaleToWidth(100)
      },
      controlImage: {
        width: '100%',
        height: width < 400 ? (175 / 419) * window.innerWidth * 0.8 : scaleToWidth(175),
        backgroundColor: '#3A354C',
        borderRadius: scaleToWidth(26),
      },
      controlImageWrapper: {
        width: width < 400 ? window.innerWidth * 0.8 : scaleToWidth(419)
      },
      orText: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'Calibre',
      },
      controlLabel: {
        fontSize: width < 400 ? 14 : scaleToWidth(24, 1),
        textAlign: 'center',
        color: '#fff',
        marginTop: 10
      },
      starA: {
        width: scaleToWidth(121),
        height: scaleToWidth(121),
      },
      starB: {
        width: scaleToWidth(105),
        height: scaleToWidth(105),
      },
      starC: {
        width: scaleToWidth(89),
        height: scaleToWidth(89),
      },
      starD: {
        width: scaleToWidth(80),
        height: scaleToWidth(80),
      },
      starE: {
        width: scaleToWidth(64),
        height: scaleToWidth(64),
      },
      starALabel: {
        fontSize: scaleToWidth(48),
        color:'#fff',
        marginTop: 4,
        textAlign: 'center',
      },
      starBLabel: {
        fontSize: scaleToWidth(45),
        color:'#fff',
        marginTop: 4,
        textAlign: 'center',
      },
      starCLabel: {
        fontSize: scaleToWidth(40),
        color:'#fff',
        marginTop: 4,
        textAlign: 'center',
      },
      starDLabel: {
        fontSize: scaleToWidth(36),
        color:'#fff',
        marginTop: 4,
        textAlign: 'center',
      },
      starELabel: {
        fontSize: scaleToWidth(32),
        color:'#fff',
        marginTop: 4,
        textAlign: 'center',
      },
      rulesText: {
        color: '#fff',
        fontFamily: 'Calibre',
        fontSize: scaleToWidth(24, 1.3, 16),
        marginTop: scaleToWidth(76, 0.8),
        textAlign: 'center'
      },
      playButton: {
        width:  width < 400 ? '70%' : scaleToWidth(272),
        height:  width < 400 ? 40 : scaleToWidth(70),
        marginBottom: scaleToWidth(30)
      }
    }
  }