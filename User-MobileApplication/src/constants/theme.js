import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export const COLORS = {
    primary: '#FE0030',
    secondary: '#38618C',

    black: '#2F3640',
    white: '#FFFFFF',

    lightGray: '#F5F5F6',
    darkGray: '#898C95',

    borderInput: '#D8DADB',
    textColor: '#636E72',
    textColorPrimary: '#2D2E2E',
    textColorPrimaryDark: '#333333',
    textColorSecondary: '#9A9A9A',
    textColorThird: '#3D3D3D',
    textColorForGotPWD : '#007AFF',

    inputBGColor: '#F1F5F7',
}

export const SIZES = {
    base: 8,
    font: 14,
    radius: 20,
    padding: 10,
    padding2: 12,

    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    width,
    height,
}

const ThemeProvider = { COLORS, SIZES }

export default ThemeProvider
