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

  return (
    <TouchableWithoutFeedback onPress={ignorePress}>
      <View>
        <TextField label="Age" keyboardType="numeric" state={age} changeFunction={setAge} />
        <PickerField
          label="Gender"
          data={genderData}
          state={gender}
          changeFunction={setGender}
          promptValue="Gender"
        />
        <TextField
          label="Height (cm)"
          keyboardType="numeric"
          state={height}
          changeFunction={setHeight}
        />
        <TextField
          label="Weight (kg)"
          keyboardType="numeric"
          state={weight}
          changeFunction={setWeight}
        />
        <PickerField
          label="Activity Level"
          data={activityLevelData}
          state={activityLevel}
          changeFunction={setActivityLevel}
          promptValue="Activity Level"
        />
        <PickerField
          label="Health Goal"
          data={healthGoalData}
          state={healthGoal}
          changeFunction={setHealthGoal}
          promptValue="Health Goal"
        />

        <DisplayField displayedText={'Your BMR is ' + bmr} />
        <DisplayField displayedText={'Recommended daily calories intake :' + calories + ' kcal'} />
      </View>
    </TouchableWithoutFeedback>
  );
}
