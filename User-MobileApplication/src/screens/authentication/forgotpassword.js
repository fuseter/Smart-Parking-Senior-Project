import React, { useState } from 'react'
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'
import { COLORS, SIZES, message, statusCode } from '../../constants'
import { UserChangePassword } from '../../services/userServices'

export default function ForgotpasswordScreen({ navigation }) {
    const [email, setemail] = useState(null)
    const [error, seterror] = useState({
        status: false,
        message: '',
    })

    const HandleSubmit = async () => {
        if (email) {
            seterror({
                status: false,
                message: '',
            })

            const data = { email }

            try {
                await UserChangePassword(data).then(response => {
                    if (response.status === statusCode.SUCCESS) {
                        navigation.navigate('ResetPasswordSuccess', {
                            email: email,
                        })
                    }
                })
            } catch (error) {
                seterror({
                    status: true,
                    message: message.NOT_FOUND_USER,
                })
            }
        } else {
            seterror({
                status: true,
                message: message.ERROR_INVALID_INPUT,
            })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require('../../assets/icons/arrow-left-solid.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>
            <View style={styles.bodyContent}>
                <Text style={styles.textHeader}>รีเซ็ตรหัสผ่าน</Text>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.subHeader}>
                        กรุณากรอกอีเมลของคุณ ระบบจะทำการส่งลิงก์
                    </Text>
                    <Text style={styles.subHeader}>
                        เพื่อตั้งค่ารหัสใหม่ไปยังอีเมลของคุณ
                    </Text>
                </View>
                {error.status ? (
                    <Text style={styles.error}>{error.message}</Text>
                ) : null}
                <View style={styles.emailInputWrapper}>
                    <Text style={styles.inputLabel}>อีเมล</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setemail}
                        value={email}
                        autoCapitalize="none"
                        autoComplete="email"
                        keyboardType="email-address"
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => HandleSubmit()}>
                    <Text style={styles.buttonLabel}>ยืนยัน</Text>
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
    bodyContent: {
        padding: 25,
    },
    subHeaderContainer: {
        marginTop: 5,
    },
    textHeader: {
        color: COLORS.textColorPrimary,
        fontWeight: '500',
        fontSize: 23,
        marginTop: 20,
    },
    subHeader: {
        fontSize: SIZES.body3,
        color: COLORS.darkGray,
    },
    emailInputWrapper: {
        marginTop: 40,
        marginBottom: 20,
    },
    input: {
        height: 49,
        padding: 10,
        backgroundColor: COLORS.inputBGColor,
        borderRadius: 5,
        fontSize: SIZES.body3,
        fontWeight: '400',
    },
    inputLabel: {
        fontSize: SIZES.body3,
        marginBottom: 11,
        fontWeight: '400',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        height: 50,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.36,
        shadowRadius: 19,
        marginTop: 30,
    },
    buttonLabel: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
    backIcon: {
        width: 24,
        height: 24,
        marginLeft: 20,
        marginTop: 10,
    },
    error: {
        color: COLORS.primary,
        fontSize: SIZES.body3,
        marginTop: 20,
    },
})
