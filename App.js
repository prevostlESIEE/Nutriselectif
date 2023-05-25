import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform, NativeModules } from 'react-native';

import { FoodPageScreen } from './FoodPage.js';
import { HealthGoalsScreen } from './HealthGoals.js';
import { MealPlanningScreen } from './MealPlanning.js';



const { StatusBarManager } = NativeModules;
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Health Goals" component={HealthGoalsScreen} />
      <Tab.Screen name="Food Page" component={FoodPageScreen} />
      <Tab.Screen name="Meal Planning" component={MealPlanningScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.AndroidSafeArea}>
        

        <StatusBar style="auto" />
        <MyTabs />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  col: {
    marginBottom: 15,
    marginTop: 15,
    flexDirection: 'column',
  },
  centeredCol: {
    marginBottom: 15,
    marginTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  AndroidSafeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
  },
});
