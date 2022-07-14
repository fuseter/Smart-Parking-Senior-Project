import React, { useEffect, useMemo, useReducer } from 'react'
import { Image } from 'react-native'
import { AuthContext } from './src/context'
import { Splash } from './src/screens/Splash'
import { COLORS, icons } from './src/constants'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Home, History, Profile, Parking } from './src/screens'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Login, Register, RegisterSuccess } from './src/screens/authentication'

const Tab = createBottomTabNavigator()
const AuthStack = createStackNavigator()
const RootStack = createStackNavigator()
const HomeStack = createStackNavigator()
const HitoryStack = createStackNavigator()
const ProfileStack = createStackNavigator()

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <AuthStack.Screen
                name="SignIn"
                component={Login}
                options={{ title: 'Sign In' }}
            />

            <AuthStack.Screen
                name="Register"
                component={Register}
                options={{ title: 'Register' }}
            />

            <AuthStack.Screen
                name="RegisterSuccess"
                component={RegisterSuccess}
                options={{ title: 'RegisterSuccess' }}
            />
        </AuthStack.Navigator>
    )
}

const RootStackScreen = ({ userToken }) => {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            {userToken ? (
                <>
                    <RootStack.Screen name="tab" component={TabsScreen} />
                    <RootStack.Screen
                        name="Parking"
                        component={Parking}
                        options={{ headerShown: false }}
                    />
                </>
            ) : (
                <RootStack.Screen name="Auth" component={AuthStackScreen} />
            )}
        </RootStack.Navigator>
    )
}

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
        </HomeStack.Navigator>
    )
}

const HistoryStackScreen = () => (
    <HitoryStack.Navigator>
        <HitoryStack.Screen
            name="History"
            component={History}
            options={{
                headerShown: false,
            }}
        />
    </HitoryStack.Navigator>
)

const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
        />
    </ProfileStack.Navigator>
)

const TabsScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.homeIcon}
                            resizeMode="contain"
                            style={{
                                width: 23,
                                height: 23,
                                tintColor: focused
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="HistoryScreen"
                component={HistoryStackScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.historyIcon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused
                                    ? COLORS.primary
                                    : COLORS.secondary,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileScreen"
                component={ProfileStackScreen}
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

export default () => {
    const initialLoginState = {
        isLoading: true,
        userID: null,
        userToken: null,
    }

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.type,
                    isLoading: false,
                }
            case 'LOGIN':
                return {
                    ...prevState,
                    userID: action.uid,
                    userToken: action.token,
                    isLoading: false,
                }
            case 'LOGOUT':
                return {
                    ...prevState,
                    userID: null,
                    userToken: null,
                    isLoading: false,
                }
            case 'REGISTER':
                return {
                    ...prevState,
                    userID: action.uid,
                    userToken: action.token,
                    isLoading: false,
                }
        }
    }

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

    const authContext = useMemo(
        () => ({
            signIn: async response => {
                try {
                    await AsyncStorage.setItem(
                        'userToken',
                        JSON.stringify(response),
                    )
                } catch (e) {
                    console.log(e)
                }
                dispatch({
                    type: 'LOGIN',
                    uid: response._id,
                    token: response.token,
                })
            },
            signUp: () => {},
            signOut: async () => {
                try {
                    await AsyncStorage.removeItem('userToken')
                } catch (e) {
                    console.log(e)
                }
                dispatch({ type: 'LOGOUT' })
            },
        }),
        [],
    )

    useEffect(() => {
        setTimeout(async () => {
            let userToken
            try {
                userToken = await AsyncStorage.getItem('userToken')
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: 'REGISTER', token: userToken })
        }, 1800)
    }, [])

    if (loginState.isLoading) {
        return <Splash />
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <RootStackScreen userToken={loginState.userToken} />
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
