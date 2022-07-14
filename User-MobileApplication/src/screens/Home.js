import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    Dimensions,
    Animated,
    Platform,
    ScrollView,
    Linking,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { fetchAllDevice, parkingActive } from '../services/deviceServices'
import { COLORS, SIZES } from '../constants'
import { message } from '../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation'
import { fetchParking } from '../services/activityService'

const { width, height } = Dimensions.get('window')
const CARD_HEIGHT = 185
const CARD_WIDTH = width * 0.8
const SPACING_FOR_CARD_INSET = width * 0.1 - 10

export default function Home({ navigation }) {
    const [deviceData, setdeviceData] = useState()
    const [loading, setloading] = useState(false)
    const [userData, setuserData] = useState('')
    const isVisible = useIsFocused()
    const [isParking, setisParking] = useState(false)
    const [error, seterror] = useState({
        status: false,
        message: '',
    })
    const [geolocation, setgeolocation] = useState({
        lat: 0,
        long: 0,
    })

    var initialMapState = {
        deviceData,
        region: {
            latitude: 15.119731145870066,
            longitude: 104.90655264644683,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
    }

    let mapIndex = 0
    let mapAnimation = new Animated.Value(0)
    const _map = React.useRef(null)
    const _scrollView = React.useRef(null)

    // const renderItem = ({ item }) => {
    //     return <Item item={item} onPress={() => AlertParking(item)} />
    // }

    const getAllDevice = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        const user = JSON.parse(userToken)
        setuserData(user)

        //แก้ไข
        // await Geolocation.getCurrentPosition(info => {
        //     setgeolocation({
        //         lat: info.coords.latitude,
        //         long: info.coords.longitude,
        //     })
        // })

        setloading(true)
        try {
            await fetchAllDevice().then(response => {
                if (response.status === 200) {
                    setloading(false)
                    var newData = []
                    response.data.data.map(data => {
                        newData.push({
                            coordinate: {
                                latitude: parseFloat(data.lat),
                                longitude: parseFloat(data.long),
                            },
                            _id: data._id,
                            title: data.title,
                            description: data.description,
                            MacAddress: data.MacAddress,
                            status: data.status,
                        })
                    })
                    setdeviceData(newData)
                } else {
                    seterror({
                        status: true,
                        message: message.ERROR_MESSAGE,
                    })
                }
            })
        } catch (error) {
            seterror({
                status: true,
                message: message.ERROR_MESSAGE,
            })
        }
    }

    const checkParked = async () => {
        try {
            await fetchParking(userData._id).then(response => {
                if (response.status === 200) {
                    setisParking(true)
                } else {
                    setisParking(false)
                }
            })
        } catch (error) {
            console.log('sdsdsd')
        }
    }

    useEffect(() => {
        if (isVisible) {
            getAllDevice()
            checkParked()
        }
    }, [isVisible])

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3) // animate 30% away from landing on the next item
            if (index >= initialMapState.deviceData.length) {
                index = initialMapState.deviceData.length - 1
            }
            if (index <= 0) {
                index = 0
            }

            clearTimeout(regionTimeout)

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index
                    const { coordinate } = initialMapState.deviceData[index]
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: initialMapState.region.latitudeDelta,
                            longitudeDelta:
                                initialMapState.region.longitudeDelta,
                        },
                        350,
                    )
                }
            }, 10)
        })
    }, [])

    const AlertParking = item =>
        Alert.alert(
            `แน่ใจหรือไม่ว่าต้องการจอดรถ${item.title}`,
            `${item.description}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        const data = {
                            deviceID: item._id,
                            MacAddress: item.MacAddress,
                            uid: userData._id,
                            title: item.title,
                            description: item.description,
                            status: 1,
                        }

                        try {
                            await parkingActive(data).then(response => {
                                if (response.status === 200) {
                                    navigation.navigate('Parking', {
                                        uid: userData._id,
                                    })
                                }
                            })
                        } catch (error) {
                            console.log('erro ', error)
                        }
                    },
                },
            ],
        )

    if (initialMapState.deviceData === undefined) {
        return <Text>....</Text>
    }

    const onMarkerPress = mapEventData => {
        const markerID = mapEventData._targetInst.return.key

        let x = markerID * CARD_WIDTH + markerID * 20
        if (Platform.OS === 'ios') {
            x = x - SPACING_FOR_CARD_INSET
        }

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true })
    }

    const interpolations = initialMapState.deviceData?.map((marker, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
        ]

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
        })

        return { scale }
    })

    return (
        <View style={styles.containerMaps}>
            <MapView
                showsUserLocation={true}
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialMapState.region}>
                {initialMapState.deviceData.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolations[index].scale,
                            },
                        ],
                    }
                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={marker.coordinate}
                            onPress={e => onMarkerPress(e)}>
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                    source={require('../assets/images/marker.png')}
                                    style={[styles.marker, scaleStyle]}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </MapView.Marker>
                    )
                })}
            </MapView>
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET,
                }}
                contentContainerStyle={{
                    paddingHorizontal:
                        Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                },
                            },
                        },
                    ],
                    { useNativeDriver: true },
                )}>
                {initialMapState.deviceData.map((marker, index) => (
                    <View style={styles.card} key={index}>
                        <View style={styles.textContent}>
                            <View style={styles.textWrapper}>
                                <View style={styles.pinIconWrapper}>
                                    <Image
                                        source={require('../assets/images/Pin.png')}
                                        style={styles.pinIcon}
                                    />
                                </View>
                                <View>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.cardtitle}>
                                        ที่จอดรถ {marker.title}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.cardDescription}>
                                        {marker.description}
                                    </Text>

                                    {marker.status === 1 ? (
                                        <Text
                                            numberOfLines={1}
                                            style={styles.cardStatusActi}>
                                            ไม่ว่าง
                                        </Text>
                                    ) : (
                                        <Text
                                            numberOfLines={1}
                                            style={styles.cardStatusInacti}>
                                            ว่าง
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <View style={styles.buttonWrapper}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Linking.openURL(
                                            `https://www.google.com/maps/dir/?api=1&destination=${marker.coordinate.latitude},${marker.coordinate.longitude}&dir_action=navigate`,
                                        )
                                    }}
                                    style={[styles.buttonStyleOutline]}>
                                    <Image
                                        style={{
                                            width: 23,
                                            height: 23,
                                            resizeMode: 'contain',
                                        }}
                                        source={require('../assets/images/directions.png')}
                                    />
                                    <Text
                                        style={[
                                            styles.textSign,
                                            {
                                                color: COLORS.primary,
                                                fontSize: SIZES.body4,
                                                fontWeight: '400',
                                            },
                                        ]}>
                                        เส้นทาง
                                    </Text>
                                </TouchableOpacity>
                                {isParking ? (
                                    <TouchableOpacity
                                        disabled={true}
                                        style={styles.buttonStyleDisable}>
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                resizeMode: 'contain',
                                            }}
                                            source={require('../assets/images/Park.png')}
                                        />
                                        <Text
                                            style={[
                                                styles.textSign,
                                                {
                                                    color: '#fff',
                                                    fontSize: SIZES.body4,
                                                    fontWeight: '700',
                                                },
                                            ]}>
                                            จอดรถ
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        disabled={
                                            marker.status === 1 ? true : false
                                        }
                                        onPress={() => {
                                            AlertParking(marker)
                                        }}
                                        style={
                                            marker.status === 1
                                                ? styles.buttonStyleDisable
                                                : styles.buttonStyle
                                        }>
                                        <Image
                                            style={{
                                                width: 25,
                                                height: 25,
                                                resizeMode: 'contain',
                                            }}
                                            source={require('../assets/images/Park.png')}
                                        />
                                        <Text
                                            style={[
                                                styles.textSign,
                                                {
                                                    color: '#fff',
                                                    fontSize: SIZES.body4,
                                                    fontWeight: '700',
                                                },
                                            ]}>
                                            จอดรถ
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>

        // // <SafeAreaView style={styles.container}>
        //     {/* <FlatList
        //         data={deviceData}
        //         renderItem={renderItem}
        //         keyExtractor={item => item._id}
        //     /> */}
        //     {/* <MapView
        //         provider={PROVIDER_GOOGLE}
        //         style={styles.map}
        //         region={{
        //             latitude: 37.78825,
        //             longitude: -122.4324,
        //             latitudeDelta: 0.015,
        //             longitudeDelta: 0.0121,
        //         }}></MapView> */}
        // {/* </SafeAreaView> */}
    )
}

const styles = StyleSheet.create({
    containerMaps: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    item: {
        padding: 15,
        marginVertical: 5,
        // marginHorizontal: 16,
        // borderRadius: 8,
    },
    title: {
        fontSize: 17,
        color: COLORS.textColorThird,
        fontWeight: '700',
    },
    date: {
        fontSize: SIZES.body4,
        color: COLORS.textColorSecondary,
    },
    price: {
        color: COLORS.textColorThird,
        fontSize: 17,
        fontWeight: '500',
    },
    cardWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },

    // ------map------
    markerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    chipsScrollView: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 90 : 80,
        paddingHorizontal: 10,
    },
    scrollView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: 'hidden',
        borderRadius: 10,
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: SIZES.body3,
        // marginTop: 5,
        fontWeight: 'bold',
        color: COLORS.textColorPrimary,
    },
    cardDescription: {
        fontSize: SIZES.body3,
        color: COLORS.textColorPrimary,
        fontWeight: '400',
    },
    cardStatusActi: {
        fontSize: 14,
        marginTop: 5,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    cardStatusInacti: {
        fontSize: 14,
        marginTop: 5,
        color: '#4cd137',
        fontWeight: 'bold',
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        display: 'flex',
        backgroundColor: COLORS.primary,
        padding: 10,
        width: 127,
        borderRadius: 5,
        height: 43,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.1,
        shadowRadius: 19,
    },
    buttonStyleOutline: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        display: 'flex',
        borderColor: COLORS.primary,
        borderWidth: 1.2,
        width: 127,
        height: 43,
        padding: 10,
        borderRadius: 5,
    },
    buttonStyleDisable: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        display: 'flex',
        backgroundColor: '#ced6e0',
        padding: 10,
        width: 127,
        borderRadius: 5,
        height: 43,
        shadowColor: '#ced6e0',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.36,
        shadowRadius: 19,
    },

    textWrapper: {
        display: 'flex',
        paddingTop: 5,
        paddingBottom: 22,
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: COLORS.white,
    },
    pinIconWrapper: {
        marginRight: 15,
    },
    pinIcon: {
        width: 32,
        height: 32,
        marginTop: 3,
    },
})
