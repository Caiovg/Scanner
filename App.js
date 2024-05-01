import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ScannerScreen from './ScannerScreen';
import BookInfoScreen from './BookInfoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ScannerScreen">
        <Stack.Screen name="ScannerScreen" component={ScannerScreen} />
        <Stack.Screen name="BookInfoScreen" component={BookInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
