import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedSplash from 'react-native-animated-splash-screen';
import socket from './src/services/socket/socket';
import Home from './src/pages/Home/Home';
import MediaList from './src/pages/MediaList/MediaList';
import MediaDetails from './src/pages/MediaDetails/MediaDetails';

const Stack = createStackNavigator();

export default function App() {
	const [isLoaded, setLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setLoaded(true);
		}, 2000);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AnimatedSplash
				backgroundColor="#000000"
				isLoaded={isLoaded}
				logoImage={require('./src/pics/logo.png')}
				logoHeight={150}
				logoWidth={150}
				translucent
			>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Home">
						<Stack.Screen
							name="Home"
							component={Home}
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="MediaList" component={MediaList} />
						<Stack.Screen
							name="MediaDetails"
							component={MediaDetails}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</AnimatedSplash>
		</SafeAreaView>
	);
}
