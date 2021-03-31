import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackScreens() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
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
		<SocketContext.Provider value={socket}>
			<SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
				<AnimatedSplash
					backgroundColor="#000000"
					isLoaded={isLoaded}
					logoImage={require('./src/pics/logo.png')}
					logoHeight={150}
					logoWidth={150}
					translucent
				>
					<NavigationContainer>
						<Tab.Navigator>
							<Tab.Screen name="Media" component={StackScreens} />
							<Tab.Screen
								name="MediaPlayer"
								component={MediaPlayer}
							/>
						</Tab.Navigator>
					</NavigationContainer>
				</AnimatedSplash>
			</SafeAreaView>
		</SocketContext.Provider>
	);
}
