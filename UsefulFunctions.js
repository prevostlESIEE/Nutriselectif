import { Keyboard } from 'react-native';

export default function ignorePress() {
  Keyboard.dismiss();
}

export const BMR = (gender, weight, height, age, activityLevel, healthGoal) => {
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  const activityLevelValue =
    activityLevel === 'sedentary'
      ? 1.2
      : activityLevel === 'light'
      ? 1.375
      : activityLevel === 'moderate'
      ? 1.55
      : activityLevel === 'heavy'
      ? 1.725
      : 1.9;

  const healthGoalValue = healthGoal === 'loss' ? -500 : healthGoal === 'maintenance' ? 0 : 500;

  return [bmr, bmr * activityLevelValue + healthGoalValue];
};
