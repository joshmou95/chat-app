import React from 'react';
// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';

import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';


// import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
