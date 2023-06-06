import React, { useState } from 'react';
import { Text, View, TextInput, Platform, TouchableWithoutFeedback, Button } from 'react-native';

import styles from './StyleSheet.js';

export function FoodPageScreen() {
  const [age, setAge] = useState('age');
  const [gender, setGender] = useState('gender');
  const [height, setHeight] = useState('height');
  const [weight, setWeight] = useState('weight');
  const [activityLevel, setActivityLevel] = useState('activityLevel');
  const [healthGoal, setHealthGoal] = useState('healthGoal');

  return (
    //4edd21ee
    //52dd75c1fcbc79ed9f5e9c2c99e3b8de
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>FoodPageScreen!</Text>
    </View>
  );
}
