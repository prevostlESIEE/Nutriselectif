import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

import { TextField, PickerField, DisplayField } from './CustomComponent';
import { ignorePress, BMR } from './UsefulFunctions';

export function HealthGoalsScreen() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [healthGoal, setHealthGoal] = useState('loss');

  const genderData = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  const activityLevelData = [
    { label: 'Sedentary', value: 'sedentary' },
    { label: 'Light Exercise', value: 'light' },
    { label: 'Moderate Exercise', value: 'moderate' },
    { label: 'Heavy Exercise', value: 'heavy' },
    { label: 'Extra Active', value: 'extraActive' },
  ];
  const healthGoalData = [
    { label: 'Weight Loss', value: 'loss' },
    { label: 'Weight Maintenance', value: 'maintenance' },
    { label: 'Weight Gain', value: 'gain' },
  ];

  const [bmr, calories] = BMR(gender, weight, height, age, activityLevel, healthGoal);

  const setDailyCaloriesData = async () => {
    try {
      const mealData = JSON.parse(await AsyncStorage.getItem('plannedMeals'));

      mealData['dailyCalories'] = calories;

      const plannedJson = JSON.stringify(mealData);
      await AsyncStorage.setItem('plannedMeals', plannedJson);
    } catch (e) {}
  };

  setDailyCaloriesData();

  const fieldChange = async (updatedField, state) => {
    try {
      await AsyncStorage.setItem(updatedField, state);
    } catch (e) {}
  };

  //despite using await, the following functions are necessary.
  //Without them, the uploaded value will always be missing the last character (or not update at all with pickers)
  const ageChange = async (value) => {
    await setAge(value);
    await fieldChange('age', value);
  };
  const genderChange = async (value) => {
    await setGender(value);
    await fieldChange('gender', value);
  };
  const heightChange = async (value) => {
    await setHeight(value);
    await fieldChange('height', value);
  };
  const weightChange = async (value) => {
    await setWeight(value);
    await fieldChange('weight', value);
  };
  const activityLevelChange = async (value) => {
    await setActivityLevel(value);
    await fieldChange('activityLevel', value);
  };
  const healthGoalChange = async (value) => {
    await setHealthGoal(value);
    await fieldChange('healthGoal', value);
  };

  const getHealthGoalDefaultValue = async () => {
    try {
      setAge(await AsyncStorage.getItem('age'));
      setGender(await AsyncStorage.getItem('gender'));
      setHeight(await AsyncStorage.getItem('height'));
      setWeight(await AsyncStorage.getItem('weight'));
      setActivityLevel(await AsyncStorage.getItem('activityLevel'));
      setHealthGoal(await AsyncStorage.getItem('healthGoal'));
    } catch (e) {}
  };
  if (age === '') getHealthGoalDefaultValue();

  return (
    <TouchableWithoutFeedback onPress={ignorePress}>
      <View>
        <TextField label="Age" keyboardType="numeric" state={age} changeFunction={ageChange} />
        <PickerField
          label="Gender"
          data={genderData}
          state={gender}
          changeFunction={genderChange}
          promptValue="Gender"
        />
        <TextField
          label="Height (cm)"
          keyboardType="numeric"
          state={height}
          changeFunction={heightChange}
        />
        <TextField
          label="Weight (kg)"
          keyboardType="numeric"
          state={weight}
          changeFunction={weightChange}
        />
        <PickerField
          label="Activity Level"
          data={activityLevelData}
          state={activityLevel}
          changeFunction={activityLevelChange}
          promptValue="Activity Level"
        />
        <PickerField
          label="Health Goal"
          data={healthGoalData}
          state={healthGoal}
          changeFunction={healthGoalChange}
          promptValue="Health Goal"
        />

        <DisplayField displayedText={'Your BMR is ' + bmr} />
        <DisplayField displayedText={'Recommended daily calories intake :' + calories + ' kcal'} />
      </View>
    </TouchableWithoutFeedback>
  );
}
