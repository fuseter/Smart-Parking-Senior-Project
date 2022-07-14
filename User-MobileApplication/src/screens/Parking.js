import React, { useEffect, useState, useRef } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from 'react-native'
import LottieView from 'lottie-react-native'
import { COLORS, SIZES } from '../constants'
import { useRoute } from '@react-navigation/native'
import moment from 'moment/min/moment-with-locales'
import { useIsFocused } from '@react-navigation/native'
import { fetchParking } from '../services/activityService'
import { parkinginActive } from '../services/deviceServices'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ParkingScreen({ route, navigation }) {
    const routes = useRoute()
    const [parkingData, setparkingData] = useState('')
    const isVisible = useIsFocused()
    const { uid } = route.params
    const [socketData, setsocketData] = useState('')
    const [serverState, setserverState] = useState('')

    var ws = React.useRef(
        new WebSocket('https://smart-parking-api-doacd.ondigitalocean.app'),
    ).current

    // const fetchParkingActive = async () => {
    //     const userToken = await AsyncStorage.getItem('userToken')
    //     const userData = JSON.parse(userToken)
    //     try {
    //         await fetchParking(userData._id).then(response => {
    //             if (response.status === 200) {
    //                 setparkingData(response.data.data)
    //             }
    //         })
    //     } catch (error) {
    //         console.log('error', error)
    //     }
    // }

    // useEffect(() => {
    //     if (isVisible) {
    //         fetchParkingActive()
    //     }
    // }, [isVisible])

    useEffect(() => {
        ws.onopen = () => {
            console.log('Connected to the  WebSocket server...')
            setInterval(() => {
                ws.send(JSON.stringify({ uid: uid }))
            }, 3000)
        }

        ws.onclose = e => {
            console.log('Disconnected. Check internet or server.')
        }

        ws.onerror = e => {
            setserverState(e.message)
            console.log('e ==>', e.message)
        }

        ws.onmessage = e => {
            let data = JSON.parse(e.data)
            if (data.status === 0) {
                if (routes.name === 'Parking') {
                    navigation.goBack()
                }
            }
            setparkingData(data)
        }
        return () => {
            ws.close()
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require('../assets/icons/arrow-left-solid.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.assetWrapper}>
                    <Image
                        style={styles.parkingImage}
                        source={require('../assets/images/imageParked.png')}
                    />
                    <LottieView
                        source={require('../assets/lottie/lf30_editor_mtl2re2z.json')}
                        autoPlay
                        loop
                        style={styles.lottieAnimation}
                    />
                </View>

                <View style={styles.bodyContent}>
                    <View style={styles.detail}>
                        <View style={styles.detailContent}>
                            {parkingData === '' ? (
                                <>
                                    <View
                                        style={{
                                            width: 35,
                                            height: 35,
                                            borderRadius: 50,
                                            backgroundColor: '#dcdde1',
                                        }}></View>
                                    <View
                                        style={{
                                            backgroundColor: '#dcdde1',
                                            borderRadius: 4,
                                            width: 265,
                                            left: 5,
                                        }}></View>
                                </>
                            ) : (
                                <>
                                    <Image
                                        style={styles.pinParkingImage}
                                        source={require('../assets/images/pinParking.png')}
                                    />
                                    <View style={styles.ContentWrapper}>
                                        <Text style={styles.title}>
                                            ที่จอดรถ {parkingData.title}
                                        </Text>
                                        <Text style={styles.description}>
                                            {parkingData.description}
                                        </Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                    <View style={styles.subDetail}>
                        {parkingData === '' ? (
                            <>
                                <View
                                    style={{
                                        width: 100,
                                        height: 20,
                                        borderRadius: 4,
                                        backgroundColor: '#dcdde1',
                                    }}></View>
                                <View
                                    style={{
                                        width: 200,
                                        height: 30,
                                        borderRadius: 4,
                                        marginTop: 7,
                                        backgroundColor: '#dcdde1',
                                    }}></View>
                            </>
                        ) : (
                            <>
                                <Text style={styles.parked}>จอดเมื่อ</Text>
                                <Text style={styles.parkedTime}>
                                    {moment(parkingData.time)
                                        .locale('th')
                                        .startOf(parkingData.time)
                                        .fromNow()}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flexGrow: 1,
    },
    bodyContent: {
        padding: 20,
    },

    assetWrapper: {
        position: 'relative',
    },
    lottieAnimation: {
        width: 130,
        position: 'absolute',
        zIndex: 1,
        marginTop: 55,
        marginLeft: 45,
        // height: 300
    },
    parkingImage: {
        width: 360,
        height: 360,
        position: 'absolute',
        zIndex: -1,
        marginTop: 30,
        marginLeft: 15,
    },
    detail: {
        backgroundColor: COLORS.white,
        marginTop: 470,
        shadowColor: '#BFBFBF',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
        height: 'auto',
        padding: 20,
        borderRadius: 10,
    },
    detailContent: {
        display: 'flex',
        flexDirection: 'row',
    },
    pinParkingImage: {
        width: 35,
        height: 35,
    },

    ContentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 15,
    },

    title: {
        color: COLORS.textColorPrimary,
        fontWeight: '700',
        fontSize: SIZES.body2,
    },
    description: {
        color: COLORS.textColorPrimary,
        fontWeight: '400',
        fontSize: SIZES.body3,
        width: '100%',
    },

    // Second card

    subDetail: {
        backgroundColor: COLORS.white,
        marginTop: 10,
        shadowColor: '#BFBFBF',
        shadowOffset: { width: 0, height: 25 },
        shadowOpacity: 0.3,
        shadowRadius: 30,
        height: 'auto',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
        borderRadius: 10,
    },

    parked: {
        color: COLORS.textColorPrimary,
        fontWeight: '400',
        fontSize: 15,
    },
    parkedTime: {
        color: COLORS.textColorPrimary,
        fontWeight: '600',
        fontSize: SIZES.body2,
        marginTop: 7,
    },
    parkedEnd: {
        color: COLORS.primary,
        fontWeight: '500',
        fontSize: 17,
        marginTop: 12,
    },
    backIcon: {
        width: 24,
        height: 24,
        marginLeft: 20,
        marginTop: 10,
    },
})
