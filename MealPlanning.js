import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { MealPlannerFoodItem } from './CustomComponent';
import styles from './StyleSheet.js';
import { dayStringFromNumber } from './UsefulFunctions.js';

export function MealPlanningScreen() {
  const todayWithTime = new Date().setHours(0, 0, 0, 0);
  const today = new Date(todayWithTime);

  const [displayedDate, setDisplayedDate] = useState(today);
  const [displayedDateString, setDisplayedDateString] = useState(Date.parse(today).toString());
  const [mealData, setMealData] = useState({});

  const [datePickerShow, setDatePickerShow] = useState(false);

  const changeDate = (change) => {
    const newDate = displayedDate.setDate(displayedDate.getDate() + change);
    setDisplayedDate(new Date(newDate));
    setDisplayedDateString(Date.parse(new Date(newDate)).toString());
  };
  const datePickerCallback = (event, newDate) => {
    setDisplayedDate(newDate);
    setDisplayedDateString(Date.parse(newDate).toString());
    setDatePickerShow(false);
  };

  const getCurrentCalories = () => {
    if (mealData[displayedDateString] !== undefined) {
      return (
        mealData[displayedDateString]['breakfastCalories'] +
        mealData[displayedDateString]['lunchCalories'] +
        mealData[displayedDateString]['snackCalories'] +
        mealData[displayedDateString]['dinerCalories']
      );
    } else return 0;
  };

  const getBreakfastCalories = () => {
    if (mealData[displayedDateString] !== undefined) {
      return mealData[displayedDateString]['breakfastCalories'];
    } else return 0;
  };
  const getLunchCalories = () => {
    if (mealData[displayedDateString] !== undefined) {
      return mealData[displayedDateString]['lunchCalories'];
    } else return 0;
  };
  const getSnackCalories = () => {
    if (mealData[displayedDateString] !== undefined) {
      return mealData[displayedDateString]['snackCalories'];
    } else return 0;
  };
  const getDinerCalories = () => {
    if (mealData[displayedDateString] !== undefined) {
      return mealData[displayedDateString]['dinerCalories'];
    } else return 0;
  };

  const getMealData = async () => {
    try {
      const mealData = JSON.parse(await AsyncStorage.getItem('plannedMeals'));

      let calories = 0;
      mealData[displayedDateString]['breakfast'] &&
        Object.entries(mealData[displayedDateString]['breakfast']).map(([key, meal]) => {
          calories += (meal.foodItem.nutrients.ENERC_KCAL * meal.quantity) / 100;
        });
      mealData[displayedDateString]['breakfastCalories'] = calories;
      calories = 0;

      mealData[displayedDateString]['lunch'] &&
        Object.entries(mealData[displayedDateString]['lunch']).map(([key, meal]) => {
          calories += (meal.foodItem.nutrients.ENERC_KCAL * meal.quantity) / 100;
        });
      mealData[displayedDateString]['lunchCalories'] = calories;
      calories = 0;

      mealData[displayedDateString]['snack'] &&
        Object.entries(mealData[displayedDateString]['snack']).map(([key, meal]) => {
          calories += (meal.foodItem.nutrients.ENERC_KCAL * meal.quantity) / 100;
        });
      mealData[displayedDateString]['snackCalories'] = calories;
      calories = 0;

      mealData[displayedDateString]['diner'] &&
        Object.entries(mealData[displayedDateString]['diner']).map(([key, meal]) => {
          calories += (meal.foodItem.nutrients.ENERC_KCAL * meal.quantity) / 100;
        });
      mealData[displayedDateString]['dinerCalories'] = calories;
      setMealData(mealData);
    } catch (e) {}
  };

  const removeFoodItem = async (foodId, meal) => {
    delete mealData[displayedDateString][meal][foodId];

    const plannedJson = JSON.stringify(mealData);
    await AsyncStorage.setItem('plannedMeals', plannedJson);
    getMealData();
  };

  if (Object.keys(mealData).length < 1) getMealData();

  //Get meal data every 5 seconds
  useEffect(() => {
    function getMeals() {
      getMealData();
    }
    getMeals();
    const interval = setInterval(() => getMeals(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={[styles.noFeedbackZone, { backgroundColor: 'green' }]}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[{ flex: 1 }]}
          onPress={() => {
            changeDate(-1);
          }}>
          <MaterialCommunityIcons
            style={[styles.centered, styles.mealPlannerHeaderheight, styles.changeDayArrow]}
            name="arrow-left"
            size={40}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity style={[{ flex: 5 }]} onPress={() => setDatePickerShow(true)}>
          <View style={[styles.centered, styles.mealPlannerHeader]}>
            <Text style={[styles.centered, styles.mealPlannerHeaderDay]}>
              {displayedDate.getDate() < 10 ? 0 + displayedDate.getDate() : displayedDate.getDate()}{' '}
              /{' '}
              {displayedDate.getMonth() < 10
                ? '0' + displayedDate.getMonth()
                : displayedDate.getMonth()}{' '}
              / {displayedDate.getFullYear()}
            </Text>
            <Text style={[styles.centered, styles.mealPlannerHeaderDay]}>
              {dayStringFromNumber(displayedDate.getDay())}
            </Text>
            <Text style={[styles.centered, styles.mealPlannerHeaderCal, { marginTop: 10 }]}>
              {getCurrentCalories()}
              {' / '}
              {mealData['dailyCalories']}
              kCal
            </Text>
          </View>
        </TouchableOpacity>

        {datePickerShow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={displayedDate}
            onChange={datePickerCallback}
          />
        )}

        <TouchableOpacity
          style={[{ flex: 1 }]}
          onPress={() => {
            changeDate(1);
          }}>
          <MaterialCommunityIcons
            style={[styles.centered, styles.mealPlannerHeaderheight, styles.changeDayArrow]}
            name="arrow-right"
            size={40}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.mealPlannerMealRow, { backgroundColor: 'lightgrey', flex: 1 }]}>
        <View style={[{ backgroundColor: 'lightgrey', flex: 0.4 }]}>
          <Text style={[styles.mealPlannerRowTitle, styles.centered, { marginBottom: 15 }]}>
            Breakfast{'\n'}
            {getBreakfastCalories()}
            {'\n'}
            kCal
          </Text>
        </View>
        <ScrollView horizontal style={styles.mealPlannerMealScrollView}>
          {mealData[displayedDateString] &&
            mealData[displayedDateString]['breakfast'] &&
            Object.entries(mealData[displayedDateString]['breakfast']).map(([key, meal]) => {
              return (
                <MealPlannerFoodItem
                  key={'breakfast' + key}
                  image={meal.foodItem.image}
                  quantity={meal.quantity}
                  label={meal.foodItem.label}
                  cal={(meal.foodItem.nutrients.ENERC_KCAL * meal.quantity) / 100}
                  prot={(meal.foodItem.nutrients.PROCNT * meal.quantity) / 100}
                  fat={(meal.foodItem.nutrients.FAT * meal.quantity) / 100}
                  foodId={key}
                  meal="breakfast"
                  removeFunction={removeFoodItem}
                />
              );
            })}
        </ScrollView>
      </View>

      <View style={[styles.mealPlannerMealRow, { backgroundColor: 'lightgrey', flex: 1 }]}>
        <View style={[{ backgroundColor: 'lightgrey', flex: 0.4 }]}>
          <Text style={[styles.mealPlannerRowTitle, styles.centered, { marginBottom: 15 }]}>
            Lunch{'\n'}
            {getLunchCalories()}
            {'\n'}
            kCal
          </Text>
        </View>
        <ScrollView horizontal style={styles.mealPlannerMealScrollView}>
          {mealData[displayedDateString] &&
            mealData[displayedDateString]['lunch'] &&
            Object.entries(mealData[displayedDateString]['lunch']).map(([key, meal]) => {
              return (
                <MealPlannerFoodItem
                  key={'lunch' + key}
                  image={meal.foodItem.image}
                  quantity={meal.quantity}
                  label={meal.foodItem.label}
                  cal={(meal.foodItem.nutrients.ENERC_KCAL * meal.quantity) / 100}
                  prot={(meal.foodItem.nutrients.PROCNT * meal.quantity) / 100}
                  fat={(meal.foodItem.nutrients.FAT * meal.quantity) / 100}
                  foodId={key}
                  meal="lunch"
                  removeFunction={removeFoodItem}
                />
              );
            })}
        </ScrollView>
      </View>

      <View style={[styles.mealPlannerMealRow, { backgroundColor: 'lightgrey', flex: 1 }]}>
        <View style={[{ backgroundColor: 'lightgrey', flex: 0.4 }]}>
          <Text style={[styles.mealPlannerRowTitle, styles.centered, { marginBottom: 15 }]}>
            Snack{'\n'}
            {getSnackCalories()}
            {'\n'}
            kCal
          </Text>
        </View>
        <ScrollView horizontal style={styles.mealPlannerMealScrollView}>
          {mealData[displayedDateString] &&
            mealData[displayedDateString]['snack'] &&
            Object.entries(mealData[displayedDateString]['snack']).map(([key, meal]) => {
              return (
                <MealPlannerFoodItem
                  key={'snack' + key}
                  image={meal.foodItem.image}
                  quantity={meal.quantity}
                  label={meal.foodItem.label}
                  cal={(meal.foodItem.nutrients.ENERC_KCAL * meal.quantity) / 100}
                  prot={(meal.foodItem.nutrients.PROCNT * meal.quantity) / 100}
                  fat={(meal.foodItem.nutrients.FAT * meal.quantity) / 100}
                  foodId={key}
                  meal="snack"
                  removeFunction={removeFoodItem}
                />
              );
            })}
        </ScrollView>
      </View>

      <View style={[styles.mealPlannerMealRow, { backgroundColor: 'lightgrey', flex: 1 }]}>
        <View style={[{ backgroundColor: 'lightgrey', flex: 0.4 }]}>
          <Text style={[styles.mealPlannerRowTitle, styles.centered, { marginBottom: 15 }]}>
            Diner{'\n'}
            {getDinerCalories()}
            {'\n'}
            kCal
          </Text>
        </View>
        <ScrollView horizontal style={styles.mealPlannerMealScrollView}>
          {mealData[displayedDateString] &&
            mealData[displayedDateString]['diner'] &&
            Object.entries(mealData[displayedDateString]['diner']).map(([key, meal]) => {
              return (
                <MealPlannerFoodItem
                  key={'diner' + key}
                  image={meal.foodItem.image}
                  quantity={meal.quantity}
                  label={meal.foodItem.label}
                  cal={(meal.foodItem.nutrients.ENERC_KCAL * meal.quantity) / 100}
                  prot={(meal.foodItem.nutrients.PROCNT * meal.quantity) / 100}
                  fat={(meal.foodItem.nutrients.FAT * meal.quantity) / 100}
                  foodId={key}
                  meal="diner"
                  removeFunction={removeFoodItem}
                />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}
