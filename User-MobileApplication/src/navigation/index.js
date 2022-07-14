import React from 'react'
import { Image } from 'react-native'
import { COLORS, icons } from '../constants'
import { Home, Credit, History, Profile } from '../screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export default function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.homeIcon}
                            resizeMode="contain"
                            style={{
                                width: 22,
                                height: 22,
                                tintColor: focused
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Credit"
                component={Credit}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.creditIcon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ประวัติ"
                component={History}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.historyIcon}
                            resizeMode="contain"
                            style={{
                                width: 29,
                                height: 29,
                                tintColor: focused
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            }}
                        />
                    ),
                    headerShown: true,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.userIcon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
