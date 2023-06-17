import { Keyboard } from 'react-native';

export function ignorePress() {
  Keyboard.dismiss(); //For some reason, this does not work and thus require the following function to be used
}
export function XXignorePress() {
  return new Promise((resolve, reject) => {
    Keyboard.dismiss();
    setTimeout(() => {
      resolve();
    }, 5);
  });
}

export function dayStringFromNumber(dayNumber) {
  switch (dayNumber) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    case 7:
      return 'Sunday';
  }
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
