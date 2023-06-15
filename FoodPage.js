import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import { TextField, AutoCompleteRow } from './CustomComponent';
import styles from './StyleSheet.js';
import { ignorePress } from './UsefulFunctions';

export function FoodPageScreen() {
  const [query, setQuery] = useState('');
  const [autoCompleteData, setAutoCompleteData] = useState([]);

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

  const updateAutocompleteData = (search) => {
    fetchAutocompleteData(search);
  };
  const resetAutocompleteData = (search) => {
    setAutoCompleteData([]);
  };

  const searchFunction = (search) => {
    alert(query + ' searched');
  };

  // autocompleteData = fetchData('potato');

  return (
    //4edd21ee
    //52dd75c1fcbc79ed9f5e9c2c99e3b8de

    <TouchableWithoutFeedback onPress={ignorePress}>
      <View style={styles.noFeedbackZone}>
        <View style={[styles.row, { zIndex: 2 }]}>
          <View style={[styles.col, { flex: 8, position: 'relative' }]}>
            <TextField
              id="foodSearchText"
              state={query}
              changeFunction={setQuery}
              placeholder="Search for food"
              additionnalStyle={[styles.noMarginBottom, styles.foodPageTextInput]}
              focusFunction={updateAutocompleteData}
              blurFunction={resetAutocompleteData}
              autoCompleteChange={updateAutocompleteData}
            />

            {autoCompleteData.map((currentValue, index, arr) => {
              return (
                <AutoCompleteRow
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
              <Text style={styles.button}>Search</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.col, { flex: 1 }]} />
      </View>
    </TouchableWithoutFeedback>
  );
}
