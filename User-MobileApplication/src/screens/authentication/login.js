import React, { useContext, useState } from 'react'
import { COLORS, SIZES } from '../../constants'
import { AuthContext } from '../../context'
import { UserSignIn } from '../../services/userServices'
import { statusCode, message } from '../../constants'
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'

const logoApp = require('../../assets/icons/logo.png')

export default function LoginScreen({ navigation }) {
    const { signIn } = useContext(AuthContext)
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const [error, seterror] = useState({
        status: false,
        message: '',
    })

    // const handleValidEmail = val => {
    //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

    //     if (val.length === 0) {
    //         setEmailValidError('กรุณากรอกอีเมล')
    //     } else if (reg.test(val) === false) {
    //         setEmailValidError('อีเมลไม่ถูกต้อง')
    //     } else if (reg.test(val) === true) {
    //         setEmailValidError('')
    //     }
    // }

    const HandleSubmit = async () => {
        if (email && password) {
            seterror({
                status: false,
                message: '',
            })
            const data = {
                email: email,
                password: password,
                role: message.role,
            }

            try {
                await UserSignIn(data).then(response => {
                    if (response.status === statusCode.SUCCESS) {
                        signIn(response.data)
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
            <View style={styles.bodyContent}>
                <View style={styles.logoAppWapper}>
                    <Image style={styles.logoApp} source={logoApp} />
                </View>
                <Text style={styles.textHeader}>เข้าสู่ระบบ</Text>
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
                <View>
                    <Text style={styles.inputLabel}>รหัสผ่าน</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setpassword}
                        value={password}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => HandleSubmit()}>
                    <Text style={styles.buttonLabel}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
                <View style={styles.registerWrapper}>
                    <Text style={styles.registerLabel}>
                        ยังไม่มีบัญชีผู้ใช้งาน ?
                    </Text>
                    <Text
                        style={styles.registerBtn}
                        onPress={() => navigation.push('Register')}>
                        ลงทะเบียน
                    </Text>
                </View>
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
    logoAppWapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -40,
    },
    logoApp: {
        width: 210,
        height: 210,
        resizeMode: 'contain',
    },
    textHeader: {
        color: COLORS.textColorPrimary,
        fontWeight: '500',
        fontSize: 23,
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
    emailInputWrapper: {
        marginTop: 30,
        marginBottom: 20,
    },
    forgotPWD: {
        fontSize: SIZES.body4,
        color: COLORS.textColorForGotPWD,
        fontWeight: '400',
        textAlign: 'right',
        marginTop: 17,
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
        marginTop: 40,
    },
    buttonLabel: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
    registerWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35,
    },
    registerBtn: {
        color: COLORS.primary,
        marginLeft: 10,
        textDecorationLine: 'underline',
        fontWeight: '500',
        fontSize: SIZES.body4,
    },
    registerLabel: {
        color: COLORS.textColorPrimaryDark,
        fontWeight: '400',
        fontSize: SIZES.body4,
    },
    error: {
        color: COLORS.primary,
        fontSize: SIZES.body4,
        marginTop: 10,
    },
})
