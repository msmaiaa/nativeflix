import React from 'react';
import { SafeAreaView, StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/components/Home/Home';
import MovieList from './src/components/MovieList/MovieList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}}></Stack.Screen>
          <Stack.Screen name="MovieList" component={MovieList}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
});
