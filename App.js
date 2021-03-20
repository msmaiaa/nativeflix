import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './src/pages/Home/Home';
import MediaList from './src/pages/MediaList/MediaList';
import MediaDetails from './src/pages/MediaDetails/MediaDetails';
import socket from './src/services/socket/socket';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="MediaList" component={MediaList} />
          <Stack.Screen name="MediaDetails" component={MediaDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
