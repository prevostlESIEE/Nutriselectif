import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';

import { SearchTextField, AutoCompleteRow, FoodItem, FoodModal } from './CustomComponent';
import styles from './StyleSheet.js';
import { ignorePress } from './UsefulFunctions';

export function FoodPageScreen() {
  const todayWithTime = new Date().setHours(0, 0, 0, 0);

  const [query, setQuery] = useState('');
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState({});
  const [quantity, setQuantity] = useState('100');
  const [meal, setMeal] = useState('breakfast');
  const [date, setDate] = useState(new Date(todayWithTime));

  const [modalVisible, setModalVisible] = useState(false);

  const fetchAutocompleteData = async (search) => {
    try {
      const API_ENDPOINT = 'https://api.edamam.com/auto-complete';
      const API_KEY = '52dd75c1fcbc79ed9f5e9c2c99e3b8de';
      const API_ID = '4edd21ee';
      const query = search;

      const url = `${API_ENDPOINT}?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

      const response = await fetch(url);
      const result = await response.json();
      setAutoCompleteData(result.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFoodData = async () => {
    try {
      const API_ENDPOINT = 'https://api.edamam.com/api/food-database/v2/parser';
      const API_KEY = '52dd75c1fcbc79ed9f5e9c2c99e3b8de';
      const API_ID = '4edd21ee';

      const url = `${API_ENDPOINT}?ingr=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

      const response = await fetch(url);
      const result = await response.json();

      setFoodData(result.hints.slice(0, 50));
    } catch (error) {
      console.error(error);
    }
  };

  const updateAutocompleteData = (search) => {
    fetchAutocompleteData(search);
  };
  const resetAutocompleteData = (search) => {
    setAutoCompleteData([]);
  };

  const searchFunction = async (search) => {
    if (query !== null || query !== undefined) fetchFoodData();
  };

  const modalToggle = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setModalVisible(!modalVisible);
  };

  const mealPressFunction = (meal) => {
    setMeal(meal);
  };

  const mealAdd = async () => {
    let plannedMeals = JSON.parse(await AsyncStorage.getItem('plannedMeals'));
    const dateString = Date.parse(date).toString();
    const addedMeal = {
      foodItem: selectedFoodItem,
      // eslint-disable-next-line object-shorthand
      quantity: quantity,
    };

    if (plannedMeals === null) {
      plannedMeals = {};
    }

    if (plannedMeals[dateString] === undefined) {
      plannedMeals[dateString] = {};
    }

    if (plannedMeals[dateString][meal] === undefined) {
      plannedMeals[dateString][meal] = {};
    }

    if (plannedMeals[dateString][meal][selectedFoodItem.foodId] === undefined) {
      plannedMeals[dateString][meal][selectedFoodItem.foodId] = addedMeal;
    } else {
      const currentQuantity = parseInt(
        plannedMeals[dateString][meal][selectedFoodItem.foodId].quantity,
        10
      );
      plannedMeals[dateString][meal][selectedFoodItem.foodId].quantity =
        currentQuantity + parseInt(addedMeal.quantity, 10);
    }

    const plannedJson = JSON.stringify(plannedMeals);
    await AsyncStorage.setItem('plannedMeals', plannedJson);

    setModalVisible(!modalVisible);
  };

  return (
    //4edd21ee
    //52dd75c1fcbc79ed9f5e9c2c99e3b8de

    <TouchableWithoutFeedback onPress={ignorePress}>
      <View style={styles.noFeedbackZone}>
        <View style={[styles.row, { zIndex: 2 }]}>
          <View style={[styles.col, { flex: 8, position: 'relative' }]}>
            <SearchTextField
              id="foodSearchText"
              state={query}
              changeFunction={setQuery}
              placeholder="Search for food"
              additionnalStyle={[
                styles.noMarginBottom,
                styles.foodPageTextInput,
                { borderRightWidth: 0 },
              ]}
              focusFunction={updateAutocompleteData}
              blurFunction={resetAutocompleteData}
              autoCompleteChange={updateAutocompleteData}
            />
            {autoCompleteData.map((currentValue, index, arr) => {
              return (
                <AutoCompleteRow
                  key={index}
                  text={currentValue}
                  onPressFunction={setQuery}
                  searchFunction={searchFunction}
                  index={index}
                />
              );
            })}
          </View>
          <TouchableOpacity style={[styles.col, { flex: 3 }]} onPress={searchFunction}>
            <View>
              <Text style={styles.searchButton}>Search</Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.col, { flex: 1 }]} />
        </View>

        <ScrollView style={{ marginTop: 20 }}>
          {foodData.map((foodElement, index, arr) => {
            if (foodElement.food.image === undefined)
              foodElement.food.image =
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';

            return (
              <>
                <TouchableOpacity
                  style={[{ height: 100, marginBottom: 10 }]}
                  onPress={() => modalToggle(foodElement.food)}>
                  <FoodItem
                    key={index}
                    label={foodElement.food.label}
                    image={foodElement.food.image}
                    foodId={foodElement.food.foodId}
                    category={foodElement.food.category}
                    nutrients={foodElement.food.nutrients}
                  />
                </TouchableOpacity>
              </>
            );
          })}
        </ScrollView>

        <FoodModal
          closeFunction={modalToggle}
          visibilityParam={modalVisible}
          selectedFoodItem={selectedFoodItem}
          quantityState={quantity}
          quantityStateFunction={setQuantity}
          mealState={meal}
          mealPressFunction={mealPressFunction}
          dateState={date}
          dateStateFunction={setDate}
          addFunction={mealAdd}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
