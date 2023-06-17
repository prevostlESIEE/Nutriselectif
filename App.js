import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';

import { FoodPageScreen } from './FoodPage.js';
import { HealthGoalsScreen } from './HealthGoals.js';
import { MealPlanningScreen } from './MealPlanning.js';
import styles from './StyleSheet.js';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Health Goals') {
            iconName = focused ? 'arm-flex' : 'arm-flex-outline';
          } else if (route.name === 'Food Page') {
            iconName = focused ? 'food-apple' : 'food-apple-outline';
          } else if (route.name === 'Meal Planning') {
            iconName = focused ? 'calendar-month' : 'calendar-month-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'lightgreen',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { paddingBottom: 3 },
      })}>
      <Tab.Screen
        name="Health Goals"
        options={{ headerShown: false }}
        component={HealthGoalsScreen}
      />
      <Tab.Screen name="Food Page" options={{ headerShown: false }} component={FoodPageScreen} />
      <Tab.Screen
        name="Meal Planning"
        options={{ headerShown: false }}
        component={MealPlanningScreen}
      />
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
