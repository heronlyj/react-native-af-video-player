import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { ToggleIcon } from './'
import { isIphoneX } from 'react-native-iphone-x-helper';
import { checkSource } from './utils'

const backgroundColor = 'transparent'

const getStyles = fullscreen => {

    const flag = isIphoneX() && fullscreen

    return StyleSheet.create({
        container: {
            height: flag ? 55 : 35,
            paddingTop: flag ? 20 : 0,
            paddingHorizontal: flag ? 34 : 0,
            justifyContent: 'flex-end',
        },
        row: {
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center'
        },
        title: {
          flex: 1,
          backgroundColor,
          paddingLeft: 10,
          paddingRight: 35,
          fontSize: 16
        },
        logo: {
          marginLeft: 5,
          height: 25,
          width: 25
        }
      })
}



const TopBar = (props) => {
  const {
    logo,
    more,
    title,
    theme,
    fullscreen,
    onMorePress,
    onExitPress,
  } = props

  const styles = getStyles(fullscreen)

  return (
    <LinearGradient colors={['rgba(0,0,0,0.75)', 'rgba(0,0,0,0)']} style={styles.container}>
      <View style={styles.row}>
        {/* { full ? <Image style={styles.logo} resizeMode="contain" {...checkSource(logo)} /> : null } */}
        {
          fullscreen
            ? <ToggleIcon
              style={styles.logo}
              onPress={() => onExitPress()}
              paddingLeft
              iconOff="arrow-back"
              iconOn="arrow-back"
              theme={theme.more}
              size={25}
            />
            : null
        }
        <Text
          style={[styles.title, { color: theme.title }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        {more ?
          <ToggleIcon
            style={styles.more}
            onPress={() => onMorePress()}
            paddingRight
            iconOff="more-horiz"
            iconOn="more-horiz"
            theme={theme.more}
            size={25}
          /> : null
        }
      </View>
    </LinearGradient>
  )
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  more: PropTypes.bool.isRequired,
  onMorePress: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
}

export { TopBar }
