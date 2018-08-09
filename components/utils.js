import { isIphoneX } from "react-native-iphone-x-helper";


export const checkSource = (uri) => {
  return typeof uri === 'string' ?
    { source: { uri } } : { source: uri }
}


export const controlBarHeight = fullScreen => {
    // return fullScreen ? (isIphoneX() ? 35 : 35) : 3
    return 35
}

export const controlBarContainerPaddingHorizontal = fullScreen => {
    return fullScreen ? (isIphoneX() ? 44 : 10) : 10
}
