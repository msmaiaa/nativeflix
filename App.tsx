/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {
	useFonts,
	Roboto_100Thin,
	Roboto_100Thin_Italic,
	Roboto_300Light,
	Roboto_300Light_Italic,
	Roboto_400Regular,
	Roboto_400Regular_Italic,
} from '@expo-google-fonts/roboto';
import { SocketContext, socket } from './src/context/socket';
import Home from './src/pages/Home/Home';
import MediaList from './src/pages/MediaList/MediaList';
import MediaDetails from './src/pages/MediaDetails/MediaDetails';
import MediaPlayer from './src/pages/MediaPlayer/MediaPlayer';
import { NavHeaderOptions } from './src/components/NavHeader/NavHeader';
import consts from './src/consts/consts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackScreens() {
	return (
		<Stack.Navigator initialRouteName="MediasHome">
			<Stack.Screen
				name="MediasHome"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="MediaList"
				component={MediaList}
				options={NavHeaderOptions}
			/>
			<Stack.Screen
				name="MediaDetails"
				component={MediaDetails}
				options={NavHeaderOptions}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	const [isLoaded, setLoaded] = useState(false);
	const [fontsLoaded] = useFonts({
		Roboto_100Thin,
		Roboto_100Thin_Italic,
		Roboto_300Light,
		Roboto_300Light_Italic,
		Roboto_400Regular,
		Roboto_400Regular_Italic,
	});
	useEffect(() => {
		setTimeout(() => {
			setLoaded(true);
		}, 2000);
	}, []);

	if (!fontsLoaded) {
		return (
			<AnimatedSplash
				backgroundColor="#000000"
				isLoaded={isLoaded}
				logoHeight={150}
				logoWidth={150}
				translucent
			/>
		);
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
			<AnimatedSplash
				backgroundColor="#000000"
				isLoaded={isLoaded}
				logoImage={require('./src/pics/logo.png')}
				logoHeight={150}
				logoWidth={150}
				translucent
			>
				<SocketContext.Provider value={socket}>
					<NavigationContainer>
						<Tab.Navigator
							screenOptions={({ route }) => ({
								tabBarIcon: ({ focused, color, size }) => {
									let iconName;

									//	leaving like this for future changes
									if (route.name === 'Home') {
										iconName = focused
											? 'ios-home'
											: 'ios-home';
									} else if (route.name === 'Player') {
										iconName = focused
											? 'ios-play'
											: 'ios-play';
									}

									return (
										<Ionicons
											name={iconName}
											size={size}
											color={color}
										/>
									);
								},
							})}
							tabBarOptions={{
								activeTintColor: consts.redShadowColor,
								inactiveTintColor: 'gray',
								style: {
									backgroundColor: '#000',
								},
							}}
						>
							<Tab.Screen name="Home" component={StackScreens} />
							<Tab.Screen
								name="Player"
								component={MediaPlayer}
								options={{ unmountOnBlur: true }}
							/>
						</Tab.Navigator>
					</NavigationContainer>
				</SocketContext.Provider>
			</AnimatedSplash>
		</SafeAreaView>
	);
}
