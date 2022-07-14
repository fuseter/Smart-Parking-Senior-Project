import React, { useState } from 'react'
import { UserSignUp } from '../../services/userServices'
import { COLORS, SIZES, message, statusCode } from '../../constants'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'

export default function RegisterScreen({ navigation }) {
    const [email, setemail] = useState(null)
    const [password, setpassword] = useState(null)
    const [phone, setphone] = useState(null)
    const [confirmPassword, setconfirmPassword] = useState(null)
    const [error, seterror] = useState({
        status: false,
        message: '',
    })

    const HandleSubmit = async () => {
        if (email && password && confirmPassword && phone.length === 10) {
            if (password === confirmPassword) {
                seterror({
                    status: false,
                    message: '',
                })
                const data = {
                    name: message.INITIAL_USER_NAME,
                    email: email,
                    password: password,
                    phone: phone,
                    role: message.USER_ROLE,
                    is_verify: false,
                }
                try {
                    await UserSignUp(data).then(response => {
                        if (response.status === statusCode.CREATED) {
                            navigation.navigate('RegisterSuccess', {
                                email: email,
                            })
                        }
                    })
                } catch (error) {
                    if (error.response.status === statusCode.ERROR_CONFLICT) {
                        seterror({
                            status: true,
                            message: message.USER_ALREADY_EXIST,
                        })
                    }
                }
            } else {
                seterror({
                    status: true,
                    message: message.ERROR_PWD_NOTMATCH,
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
                <Text style={styles.textHeader}>ลงทะเบียน</Text>
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
                <View style={styles.phoneInputWrapper}>
                    <View>
                        <Text style={styles.inputLabel}>เบอร์โทรศัพท์</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setphone}
                            value={phone}
                            keyboardType="numeric"
                            maxLength={10}
                        />
                    </View>
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
                <View style={styles.ConfirmPWDInputWrapper}>
                    <Text style={styles.inputLabel}>ยืนยันรหัสผ่าน</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setconfirmPassword}
                        value={confirmPassword}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => HandleSubmit()}>
                    <Text style={styles.buttonLabel}>ลงทะเบียน</Text>
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
    textHeader: {
        color: COLORS.textColorPrimary,
        fontWeight: '500',
        fontSize: 23,
        marginTop: 20,
    },
    emailInputWrapper: {
        marginTop: 30,
        marginBottom: 20,
    },
    ConfirmPWDInputWrapper: {
        marginTop: 20,
    },
    phoneInputWrapper: {
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
        fontSize: SIZES.body4,
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
        marginTop: 40,
    },
    buttonLabel: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
    error: {
        color: COLORS.primary,
        fontSize: SIZES.body3,
        marginTop: 10,
    },
    backIcon: {
        width: 24,
        height: 24,
        marginLeft: 20,
        marginTop: 10,
    },
})
