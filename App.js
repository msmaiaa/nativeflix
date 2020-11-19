import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home/Home';
import MovieList from './src/components/MovieList/MovieList';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieDetails from './src/components/MovieDetails/MovieDetails';
import socket from './src/services/socket/socket';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="MovieList" component={MovieList}></Stack.Screen>
          <Stack.Screen name="MovieDetails" component={MovieDetails}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
