import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback as Touchable
} from 'react-native'
import {
  PlayButton,
  ControlBar,
  Loading,
  TopBar,
  ProgressBar
} from './'

import { isIphoneX } from 'react-native-iphone-x-helper';

const getStyles = fullscreen => {
  
  const flag = isIphoneX() && fullscreen

  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 99
    },
    contentContainer: {
      paddingHorizontal: flag ? 34 : 0,
      paddingBottom: flag ? 34 : 0,
    },
    flex: {
      flex: 1
    }
  })
}

class Controls extends Component {
  constructor() {
    super()
    this.state = {
      hideControls: false,
      seconds: 0,
      seeking: false,
      scale: 1, 
      animControls: 1,
      progressbar: 2,
    }
  }

  componentDidMount() {
    this.setTimer()
  }

  componentWillUnmount() {
  }

  onSeek(pos) {
    this.props.onSeek(pos)
    if (!this.state.seeking) {
      this.setState({ seeking: true })
    }
  }

  onSeekRelease(pos) {
    this.props.onSeekRelease(pos)
    this.setState({ seeking: false, seconds: 0 })
  }

  setTimer() {
    switch (true) {
      case this.state.seeking:
        // do nothing
        break
      case this.props.paused:
        if (this.state.seconds > 0) {
          this.setState({ seconds: 0 })
        }
        break
      case this.state.hideControls:
        break
      case this.state.seconds > 3:
        this.hideControls()
        break
      default:
        this.setState({ seconds: this.state.seconds + 1 })
    }
  }

  showControls() {
    this.setState({ hideControls: false, animControls: 1, scale: 1 })
  }

  hideControls() {
    this.setState({ hideControls: true, seconds: 0, animControls: 0, scale: 0.25 })
  }

  hiddenControls() {
    const styles = getStyles(this.props.fullscreen)
    return (
      <Touchable style={styles.container} onPress={() => this.showControls()}>
        <View style={styles.contentContainer}>
          <ProgressBar theme={this.props.theme.progress} progress={this.props.progress} />
        </View>
      </Touchable>
    )
  }

  loading() {
    return (
      <View style={styles.container}>
        <Loading theme={this.props.theme.loading} />
      </View>
    )
  }

  displayedControls() {
    const {
      paused,
      fullscreen,
      muted,
      loading,
      logo,
      more,
      onExitPress,
      onMorePress,
      title,
      progress,
      currentTime,
      duration,
      theme,
      inlineOnly
    } = this.props

    const { center, ...controlBar } = theme

    const styles = getStyles(fullscreen)

    return (
      <Touchable onPress={() => this.hideControls()}>
        <View style={[styles.container, { opacity: this.state.animControls }]}>
          <TopBar
            title={title}
            logo={logo}
            more={more}
            fullscreen={fullscreen}
            onExitPress={() => onExitPress()}
            onMorePress={() => onMorePress()}
            theme={{ title: theme.title, more: theme.more }}
          />
          <View style={styles.flex}>
            <PlayButton
              onPress={() => this.props.togglePlay()}
              paused={paused}
              loading={loading}
              theme={center}
            />
          </View>
          <ControlBar
            toggleFS={() => this.props.toggleFS()}
            toggleMute={() => this.props.toggleMute()}
            togglePlay={() => this.props.togglePlay()}
            muted={muted}
            paused={paused}
            fullscreen={fullscreen}
            onSeek={pos => this.onSeek(pos)}
            onSeekRelease={pos => this.onSeekRelease(pos)}
            progress={progress}
            currentTime={currentTime}
            duration={duration}
            theme={controlBar}
            inlineOnly={inlineOnly}
          />
        </View>
      </Touchable>
    )
  }

  render() {
    if (this.props.loading) return this.loading()
    if (this.state.hideControls) {
      return this.hiddenControls(fullscreen)
    }
    return this.displayedControls()
  }
}

Controls.propTypes = {
  toggleFS: PropTypes.func.isRequired,
  toggleMute: PropTypes.func.isRequired,
  togglePlay: PropTypes.func.isRequired,
  onSeek: PropTypes.func.isRequired,
  onSeekRelease: PropTypes.func.isRequired,
  onMorePress: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  inlineOnly: PropTypes.bool.isRequired,
  fullscreen: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  more: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
}

export { Controls }
