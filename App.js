//import * as React from "react";
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, BlurView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListOfReceipts from './src/screens/ListOfReceipts';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Signed Receipts" component={ListOfReceipts} initialParams={{ signature: true }} />
        <Tab.Screen name="Unsigned Receipts" component={ListOfReceipts} initialParams={{ signature: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
/*
<Tab.Navigator screenOptions={{
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        ),
    }}>
*/