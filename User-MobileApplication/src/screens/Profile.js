import React, { useState, useContext, useEffect } from 'react'
import { COLORS, SIZES } from '../constants/theme'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { AuthContext } from '../context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserUpdateProfile, UserProfile } from '../services/userServices'
import { statusCode } from '../constants'
import { useIsFocused } from '@react-navigation/native'

export default function ProfileScreen() {
    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [inputChange, setinputChange] = useState(false)
    const isVisible = useIsFocused()
    const { signOut } = useContext(AuthContext)
    const [invalidInput, setinvalidInput] = useState({
        status: false,
        msg: '',
    })

    async function getUserData() {
        try {
            const userToken = await AsyncStorage.getItem('userToken')
            const userData = JSON.parse(userToken)
            await UserProfile(userData._id).then(response => {
                if (response.status === statusCode.SUCCESS) {
                    setemail(response.data.email)
                    setname(response.data.name)
                    setphone(response.data.phone)
                } else {
                    setinvalidInput({
                        status: true,
                        msg: 'เกิดข้อผิดพลาด',
                    })
                }
            })
        } catch (error) {
            setinvalidInput({
                status: true,
                msg: 'เกิดข้อผิดพลาด',
            })
        }
    }

    useEffect(() => {
        if (isVisible) {
            getUserData()
        }
    }, [isVisible])

    async function onSubmit() {
        if (name && phone.length === 10) {
            setinputChange(false)
            setinvalidInput({
                status: false,
                msg: '',
            })
            const userToken = await AsyncStorage.getItem('userToken')
            const userData = JSON.parse(userToken)
            const data = {
                name: name,
                phone: phone,
                uid: userData._id,
            }

            try {
                await UserUpdateProfile(data).then(response => {
                    if (response.status === statusCode.SUCCESS) {
                        console.log('res ==> ', response.data)
                    } else {
                        setinvalidInput({
                            status: true,
                            msg: 'เกิดข้อผิดพลาด',
                        })
                    }
                })
            } catch (error) {
                setinvalidInput({
                    status: true,
                    msg: 'เกิดข้อผิดพลาด',
                })
            }
        } else {
            setinvalidInput({
                status: true,
                msg: 'ข้อมูลไม่ถูกต้อง',
            })
        }
    }

    function renderImageProfile() {
        return (
            <View style={styles.imageProfileWrapper}>
                <Image
                    style={styles.imageProfile}
                    source={require('../assets/images/profile.png')}
                />
                <View style={styles.verifyWrapper}>
                    <Image
                        source={require('../assets/icons/protection.png')}
                        style={styles.protectIcon}
                    />
                    <Text style={styles.textVerify}>Verified</Text>
                </View>
            </View>
        )
    }

    function renderTextFields() {
        return (
            <View style={styles.inputWrapper}>
                <Text style={styles.labelForInput}>อีเมล</Text>
                <TextInput
                    style={styles.inputEmail}
                    value={email}
                    editable={false}
                    selectTextOnFocus={false}
                />
                <Text style={styles.labelForInput}>ชื่อ - นามสกุล</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={value => {
                        setname(value)
                        setinputChange(true)
                    }}
                    value={name}
                />
                <Text style={styles.labelForInput}>เบอร์โทรศัพท์</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={value => {
                        setphone(value)
                        setinputChange(true)
                    }}
                    value={phone}
                    keyboardType="numeric"
                    maxLength={10}
                />
            </View>
        )
    }

    function renderButton() {
        return (
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => signOut()}>
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: 16,
                            fontWeight: '500',
                        }}>
                        ออกจากระบบ
                    </Text>
                </TouchableOpacity>
                <Text
                    style={{
                        color: COLORS.textColor,
                        fontSize: SIZES.body4,
                        textDecorationLine: 'underline',
                    }}>
                    v.1.0.0
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {inputChange ? (
                <TouchableOpacity onPress={onSubmit}>
                    <Text style={styles.inputTrue}>บันทึก</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.inputFalse}>บันทึก</Text>
            )}

            {renderImageProfile()}
            {invalidInput.status ? (
                <Text style={styles.error}>{invalidInput.msg}</Text>
            ) : null}
            {renderTextFields()}
            {renderButton()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    imageProfileWrapper: {
        alignItems: 'center',
    },
    imageProfile: {
        width: 100,
        height: 100,
        borderRadius: 200,
        marginTop: 20,
        marginBottom: 10,
    },
    labelForInput: {
        textAlign: 'left',
        marginBottom: 10,
        fontSize: SIZES.body4,
    },
    inputWrapper: {
        marginHorizontal: 20,
        flexGrow: 6,
    },
    input: {
        height: 55,
        borderWidth: 1,
        borderColor: COLORS.borderInput,
        borderRadius: 8,
        padding: 10,
        width: SIZES.width * 0.9,
        marginBottom: 20,
    },
    inputEmail: {
        height: 55,
        borderWidth: 1,
        borderColor: COLORS.borderInput,
        borderRadius: 8,
        padding: 10,
        width: SIZES.width * 0.9,
        marginBottom: 20,
        backgroundColor: COLORS.lightGray,
    },
    buttonWrapper: {
        alignItems: 'center',
        bottom: 0,
        flexGrow: 1,
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
        marginBottom: 20,
    },

    verifyWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    textVerify: {
        fontSize: SIZES.body4,
        fontWeight: '500',
        marginLeft: 5,
    },
    protectIcon: {
        width: 20,
        height: 20,
    },
    inputFalse: {
        textAlign: 'right',
        marginRight: 40,
        marginTop: 20,
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.darkGray,
    },
    inputTrue: {
        textAlign: 'right',
        marginRight: 40,
        marginTop: 20,
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.primary,
    },
    error: {
        color: COLORS.primary,
        fontSize: SIZES.body3,
        textAlign: 'center',
        marginBottom: 15,
    },
})
