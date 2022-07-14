import React, { useState, useEffect } from 'react'
import { COLORS, SIZES } from '../constants'
import { fetchAllActivity } from '../services/activityService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native'
import moment from 'moment/min/moment-with-locales'
import { useIsFocused } from '@react-navigation/native'
import { configs } from '../constants/config'

const Item = ({ item, navigation, activityData, userID }) =>
    item.status === 1 ? (
        <View style={styles.parkingContainer}>
            <Text style={styles.ParkingNowTitle}>ปัจจุบัน</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Parking', { uid: userID })}>
                <View style={styles.parkingCardWrapper}>
                    <View style={styles.pinIconWrapper}>
                        <Image
                            source={require('../assets/images/Pin.png')}
                            style={styles.pinIcon}
                        />
                    </View>
                    <View>
                        <Text style={styles.parkednow}>กำลังจอดอยู่</Text>
                        <Text style={styles.title}>
                            {item.title} {item.description}
                        </Text>
                        <Text style={styles.datetime}>
                            {moment(item.time).locale('th').calendar()}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            {activityData >= 2 ? (
                <Text style={styles.ParkingHistory}>ประวัติ</Text>
            ) : null}
        </View>
    ) : (
        <View style={styles.item}>
            <View style={styles.cardWrapper}>
                <View style={styles.pinIconWrapper}>
                    <Image
                        source={require('../assets/images/Pin.png')}
                        style={styles.pinIcon}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.descrip}>{item.description}</Text>
                    <Text style={styles.datetime}>
                        {moment(item.time).locale('th').format('lll')}
                    </Text>
                </View>
            </View>
        </View>
    )

export default function HistoryScreen({ navigation }) {
    const [activityData, setactivityData] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [userID, setuserID] = useState('')
    const isVisible = useIsFocused()

    const renderItem = ({ item }) => (
        <Item
            item={item}
            navigation={navigation}
            activityData={activityData.length}
            userID={userID}
        />
    )

    const fetchHistory = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        const userData = JSON.parse(userToken)
        const data = { uid: userData._id }
        setuserID(userData._id)

        try {
            await fetchAllActivity(data).then(response => {
                if (response.status === 200) {
                    setisLoading(false)
                    setactivityData(response.data.data)
                } else {
                    setactivityData([])
                    setisLoading(false)
                }
            })
        } catch (error) {
            setactivityData([])
            setisLoading(false)
        }
    }

    useEffect(() => {
        if (isVisible) {
            fetchHistory()
        }
    }, [isVisible])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.titleScreen}>รายการของฉัน</Text>
            </View>
            {activityData.length === 0 ? (
                <></>
            ) : (
                <FlatList
                    data={activityData}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    refreshing={isLoading}
                    onRefresh={fetchHistory}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    titleWrapper: {
        padding: 25,
    },
    titleScreen: {
        color: COLORS.textColorPrimary,
        fontSize: 26,
        fontWeight: '700',
    },
    pinIcon: {
        width: 32,
        height: 32,
        marginTop: 3,
    },
    pinIconWrapper: {
        marginRight: 20,
    },
    item: {
        padding: 15,
        marginVertical: 5,
        // marginHorizontal: 16,
        // borderRadius: 8,
    },
    title: {
        fontSize: 14.5,
        color: COLORS.textColorPrimary,
        fontWeight: '500',
    },
    // descrip: {
    //     fontSize: SIZES.body4 ,
    //     color: COLORS.textColorPrimary,
    // },
    datetime: {
        color: COLORS.textColorSecondary,
        fontSize: 14.5,
        fontWeight: '400',
        marginTop: 5,
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    parkingContainer: {
        padding: 10,
    },
    parkingCardWrapper: {
        display: 'flex',
        paddingLeft: 17,
        paddingTop: 17,
        paddingBottom: 17,
        flexDirection: 'row',
        marginBottom: 35,
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 19,
        borderRadius: 10,
        backgroundColor: COLORS.white,
    },
    ParkingNowTitle: {
        paddingLeft: 10,
        paddingBottom: 17,
        color: COLORS.textColorPrimary,
        fontSize: SIZES.body2,
        fontWeight: '500',
    },
    parkednow: {
        color: COLORS.primary,
        fontSize: SIZES.body3,
        fontWeight: '800',
        marginBottom: 5,
    },
    ParkingHistory: {
        paddingLeft: 10,
        paddingBottom: 10,
        color: COLORS.textColorPrimary,
        fontSize: SIZES.body2,
        fontWeight: '500',
    },
    lottieAnimation: {
        width: 230,
    },
    lottieAnimationWrappper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
})
