import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import LottieView from 'lottie-react-native'

const logoApp = require('../../assets/icons/logo_white.png')

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image style={styles.logoApp} source={logoApp} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:COLORS.primary,
        flexGrow : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoApp: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    }
})
