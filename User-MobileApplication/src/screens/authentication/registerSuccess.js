import React from 'react'
import { COLORS, SIZES } from '../../constants'
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'

const RegisterIMG = require('../../assets/images/registerSuccessIMG.png')

export default function RegisterSuccessScreen({ route, navigation }) {
    const { email } = route.params

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.closeIconWrapper}>
                <Text onPress={() => navigation.popToTop()}>ปิด</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Image style={styles.RegisterIMGStyle} source={RegisterIMG} />
                <View style={styles.wordingContainer}>
                    <Text style={styles.title}>
                        ระบบได้ทำการส่งลิงก์ยืนยันอีเมลไปที่
                    </Text>
                    <Text style={styles.email}>{email}</Text>
                    <Text style={styles.subTitle}>
                        โปรดตรวจสอบอีเมลของคุณเพื่อทำการยืนยัน
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.popToTop()}>
                    <Text style={styles.buttonLabel}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: COLORS.white,
        flexGrow: 1,
    },
    bodyContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    RegisterIMGStyle: {
        width: 350,
        height: 350,
    },
    wordingContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    title: {
        color: COLORS.textColorPrimary,
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 7,
    },
    email: {
        color: COLORS.textColorPrimary,
        fontSize: SIZES.h4,
        fontWeight: '800',
        marginBottom: 7,
    },
    subTitle: {
        color: COLORS.textColorPrimary,
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 7,
    },
    closeIconWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 25,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
        width: SIZES.width * 0.9,
        borderRadius: 10,
        height: 50,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.36,
        shadowRadius: 19,
        marginTop: 55,
    },
    buttonLabel: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
})
