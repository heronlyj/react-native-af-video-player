import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ToggleIcon, Time, Scrubber } from './'
import { controlBarHeight, controlBarContainerPaddingHorizontal } from './utils';
import { isIphoneX } from 'react-native-iphone-x-helper';

const getStyles = fullscreen => {

    const flag = isIphoneX() && fullscreen

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            height: flag ? 55 : 35,
            paddingBottom: flag ? 20 : 0,
            paddingHorizontal: flag ? 34 : 5 ,
        }
    })
}

const ControlBar = (props) => {
    const {
        onSeek,
        onSeekRelease,
        progress,
        currentTime,
        duration,
        muted,
        fullscreen,
        theme,
        inlineOnly
    } = props

    const styles = getStyles(fullscreen)

    return (
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']} style={styles.container}>
            <Time time={currentTime} theme={theme.seconds} />
            <Scrubber
                onSeek={pos => onSeek(pos)}
                onSeekRelease={pos => onSeekRelease(pos)}
                progress={progress}
                theme={{ scrubberThumb: theme.scrubberThumb, scrubberBar: theme.scrubberBar }}
            />
            <ToggleIcon
                paddingLeft
                theme={theme.volume}
                onPress={() => props.toggleMute()}
                isOn={muted}
                iconOff="volume-up"
                iconOn="volume-mute"
                size={20}
            />
            <Time time={duration} theme={theme.duration} />
            {!inlineOnly && !fullscreen ?
                <ToggleIcon
                    paddingRight5
                    onPress={() => props.toggleFS()}
                    iconOff="fullscreen"
                    iconOn="fullscreen-exit"
                    isOn={fullscreen}
                    theme={theme.fullscreen}
                /> : null}
        </LinearGradient>
    )
}

ControlBar.propTypes = {
    toggleFS: PropTypes.func.isRequired,
    toggleMute: PropTypes.func.isRequired,
    onSeek: PropTypes.func.isRequired,
    onSeekRelease: PropTypes.func.isRequired,
    fullscreen: PropTypes.bool.isRequired,
    muted: PropTypes.bool.isRequired,
    inlineOnly: PropTypes.bool.isRequired,
    progress: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired
}

export { ControlBar }
