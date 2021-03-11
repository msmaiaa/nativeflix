import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home/Home';
import MediaList from './src/components/MediaList/MediaList';
import { SafeAreaView } from 'react-native-safe-area-context';
import MediaDetails from './src/components/MediaDetails/MediaDetails';
import socket from './src/services/socket/socket';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="MediaList" component={MediaList}></Stack.Screen>
          <Stack.Screen name="MediaDetails" component={MediaDetails}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

