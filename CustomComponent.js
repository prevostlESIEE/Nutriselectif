import { useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import {
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';

import styles from './StyleSheet.js';
import { ignorePress, dayStringFromNumber } from './UsefulFunctions.js';
import DateTimePicker from '@react-native-community/datetimepicker';

export const TextField = (props) => {
  return (
    <>
      {props.label !== undefined ? (
        <View style={styles.row}>
          <Text style={[styles.fieldLabel]}>{props.label}</Text>
        </View>
      ) : (
        <View style={{ marginTop: 15 }} />
      )}

      <View style={styles.row}>
        <View style={[styles.col, { flex: 1 }]} />
        <View style={[styles.col, { flex: 4 }]}>
          <TextInput
            id={props.id}
            style={[styles.input, props.additionnalStyle]}
            keyboardType={props.keyboardType}
            value={props.state}
            placeholder={props.placeholder}
            onChangeText={function (newValue) {
              props.changeFunction(newValue);
              if (props.autoCompleteChange) props.autoCompleteChange(newValue);
            }}
            onFocus={function () {
              if (props.focusFunction) props.focusFunction(this.value);
            }}
            onBlur={props.blurFunction}
          />
        </View>
        <View style={[styles.col, { flex: 1 }]} />
      </View>

      <View style={styles.row} />
    </>
  );
};

export const SearchTextField = (props) => {
  return (
    <>
      {props.label !== undefined ? (
        <View style={styles.row}>
          <Text style={[styles.fieldLabel]}>{props.label}</Text>
        </View>
      ) : (
        <View style={{ marginTop: 15 }} />
      )}

      <View style={styles.row}>
        <View style={[styles.col, { flex: 1 }]} />
        <View style={[styles.col, { flex: 6 }]}>
          <TextInput
            id={props.id}
            style={[styles.input, props.additionnalStyle]}
            keyboardType={props.keyboardType}
            value={props.state}
            placeholder={props.placeholder}
            onChangeText={function (newValue) {
              props.changeFunction(newValue);
              if (props.autoCompleteChange) props.autoCompleteChange(newValue);
            }}
            onFocus={function () {
              if (props.focusFunction) props.focusFunction(this.value);
            }}
            onBlur={props.blurFunction}
          />
        </View>
      </View>

      <View style={styles.row} />
    </>
  );
};

export const PickerField = (props) => {
  if (Platform.OS === 'android') {
    return (
      <>
        <View style={styles.row}>
          <Text style={[styles.fieldLabel]}>{props.label}</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.col, { flex: 1 }]} />
          <View style={[styles.col, { flex: 4 }]}>
            <View style={styles.pickerView}>
              <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={props.state}
                onValueChange={props.changeFunction}
                prompt={props.promptValue}>
                {props.data.map((prop, key) => {
                  return <Picker.Item key={key} label={prop.label} value={prop.value} />;
                })}
              </Picker>
            </View>
          </View>
          <View style={[styles.col, { flex: 1 }]} />
        </View>
      </>
    );
  } else {
    return (
      <>
        <View style={styles.row}>
          <Text style={[styles.fieldLabel]}>{props.label}</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.col, { flex: 1 }]} />
          <View style={[styles.col, { flex: 4 }]}>
            <Picker
              style={styles.pickerIos}
              itemStyle={styles.pickerItemIos}
              selectedValue={props.state}
              onValueChange={props.changeFunction}>
              {props.data.map((prop, key) => {
                return <Picker.Item key={key} label={prop.label} value={prop.value} />;
              })}
            </Picker>
          </View>
          <View style={[styles.col, { flex: 1 }]} />
        </View>
      </>
    );
  }
};

export const DisplayField = (props) => {
  return (
    <>
      <View style={styles.row}>
        <View style={[styles.col, { flex: 1 }]} />
        <View style={[styles.col, { flex: 8 }]}>
          <Text style={styles.displayField}>{props.displayedText}</Text>
        </View>
        <View style={[styles.col, { flex: 1 }]} />
      </View>
    </>
  );
};

export const AutoCompleteRow = (props) => {
  return (
    <TouchableOpacity
      onPress={function () {
        props.onPressFunction(props.text);
        ignorePress();
      }}>
      <View
        style={[styles.row, { position: 'absolute', left: 0, bottom: (props.index + 1) * -40 }]}>
        <View style={[styles.col, { flex: 1 }]} />
        <View style={[styles.col, { flex: 4 }]}>
          <Text style={styles.autocomplete}>{props.text}</Text>
        </View>
        <View style={[styles.col, { flex: 1 }]} />
      </View>
    </TouchableOpacity>
  );
};

export const FoodItem = (props) => {
  return (
    <View style={[styles.row]}>
      <View style={[styles.col, { flex: 1 }]} />
      <View style={[styles.col, { flex: 7, height: 100 }]}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <View style={[styles.col, styles.foodItem, { flex: 15, height: '100%' }]}>
        <Text style={styles.bold}>{props.label}</Text>
        <Text>{props.category}</Text>
        <Text style={{ marginTop: 5 }}>100g :</Text>
        <View style={[styles.row]}>
          {props.nutrients.ENERC_KCAL !== undefined ? (
            <Text style={[styles.col, { flex: 1 }]}>
              {Math.floor(props.nutrients.ENERC_KCAL * 100) / 100} kcal
            </Text>
          ) : null}
          {props.nutrients.PROCNT !== undefined ? (
            <Text style={[styles.col, { flex: 1 }]}>
              {Math.floor(props.nutrients.PROCNT * 100) / 100}g prot
            </Text>
          ) : null}
          {props.nutrients.FAT !== undefined ? (
            <Text style={[styles.col, { flex: 1 }]}>
              {Math.floor(props.nutrients.FAT * 100) / 100}g fat
            </Text>
          ) : null}
        </View>
      </View>
      <View style={[styles.col, { flex: 1 }]} />
    </View>
  );
};

export const FoodModal = (props) => {
  const [datePickerShow, setDatePickerShow] = useState(false);

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDatePickerShow(false);
    props.dateStateFunction(currentDate);
  };

  return (
    <Modal style={styles.modal} animationType="slide" visible={props.visibilityParam}>
      <View style={[styles.row]}>
        <TouchableOpacity style={[styles.col, { flex: 3 }]} onPress={props.closeFunction}>
          <View>
            <Text style={styles.closeButton}>Close</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={[styles.row, { marginTop: 20 }]}>
          <Text style={[styles.title, styles.bold, styles.centered, { flex: 1 }]}>
            {props.selectedFoodItem.label}
          </Text>
        </View>

        <View style={[styles.row]}>
          <Text style={[styles.bold, styles.centered, { flex: 1 }]}>
            {props.selectedFoodItem.category}
          </Text>
        </View>

        <View style={[styles.row, { marginTop: 20 }]}>
          <View style={[styles.col, { flex: 1 }]} />
          <View style={[styles.col, { flex: 3, height: 175 }]}>
            <Image style={styles.image} source={{ uri: props.selectedFoodItem.image }} />
          </View>
          <View style={[styles.col, { flex: 1 }]} />
        </View>

        <View style={[styles.row, { marginTop: 20 }]}>
          <Text style={[styles.col, styles.centered, styles.title2, { flex: 1 }]}>per 100g</Text>
        </View>

        <View style={[styles.row, { height: 50, borderBottomWidth: 2 }]}>
          {props.selectedFoodItem.nutrients !== undefined &&
          props.selectedFoodItem.nutrients.PROCNT !== undefined ? (
            <Text style={[styles.col, styles.title2, styles.centered, { flex: 1 }]}>
              {Math.floor(props.selectedFoodItem.nutrients.ENERC_KCAL * 100) / 100} kcal
            </Text>
          ) : null}

          {props.selectedFoodItem.nutrients !== undefined &&
          props.selectedFoodItem.nutrients.PROCNT !== undefined ? (
            <Text style={[styles.col, styles.title2, styles.centered, { flex: 1 }]}>
              {Math.floor(props.selectedFoodItem.nutrients.PROCNT * 100) / 100}g prot
            </Text>
          ) : null}

          {props.selectedFoodItem.nutrients !== undefined &&
          props.selectedFoodItem.nutrients.PROCNT !== undefined ? (
            <Text style={[styles.col, styles.title2, styles.centered, { flex: 1 }]}>
              {Math.floor(props.selectedFoodItem.nutrients.FAT * 100) / 100}g fat
            </Text>
          ) : null}
        </View>

        <View style={[styles.row, { marginTop: 20 }]}>
          <Text style={[styles.title, styles.bold, styles.centered, { flex: 1 }]}>
            Add it to my Meal Plan
          </Text>
        </View>

        <View style={[styles.row, { marginTop: 10 }]}>
          <View style={[styles.col, { flex: 1 }]} />
          <View style={[styles.col, { flex: 15 }]}>
            <Text style={styles.title2}>Quantity (g)</Text>
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.col, { flex: 1 }]} />
          <View style={[styles.col, { flex: 12 }]}>
            <TextInput
              style={[styles.input]}
              keyboardType="numeric"
              value={props.quantityState}
              onChangeText={props.quantityStateFunction}
            />
          </View>
          <View style={[styles.col, { flex: 3 }]} />
        </View>

        <View style={[styles.row, { marginTop: 10 }]}>
          <View style={[styles.col, { flex: 1 }]}>
            <Text style={[styles.title2, styles.centered]}>Meal</Text>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 10, marginHorizontal: 10 }]}>
          <View style={[styles.col, { flex: 1 }]}>
            <TouchableOpacity
              style={[styles.col, { flex: 3, marginHorizontal: 2 }]}
              onPress={() => props.mealPressFunction('breakfast')}>
              <View>
                <Text
                  style={[
                    styles.uniqueButton,
                    {
                      backgroundColor: props.mealState === 'breakfast' ? 'lightgreen' : 'lightgrey',
                    },
                  ]}
                  active>
                  Breakfast
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.col, { flex: 1 }]}>
            <TouchableOpacity
              style={[styles.col, { flex: 3, marginHorizontal: 2 }]}
              onPress={() => props.mealPressFunction('lunch')}>
              <View>
                <Text
                  style={[
                    styles.uniqueButton,
                    { backgroundColor: props.mealState === 'lunch' ? 'lightgreen' : 'lightgrey' },
                  ]}>
                  Lunch
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.col, { flex: 1 }]}>
            <TouchableOpacity
              style={[styles.col, { flex: 3, marginHorizontal: 2 }]}
              onPress={() => props.mealPressFunction('snack')}>
              <View>
                <Text
                  style={[
                    styles.uniqueButton,
                    { backgroundColor: props.mealState === 'snack' ? 'lightgreen' : 'lightgrey' },
                  ]}>
                  Snack
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.col, { flex: 1 }]}>
            <TouchableOpacity
              style={[styles.col, { flex: 3, marginHorizontal: 2 }]}
              onPress={() => props.mealPressFunction('diner')}>
              <View>
                <Text
                  style={[
                    styles.uniqueButton,
                    { backgroundColor: props.mealState === 'diner' ? 'lightgreen' : 'lightgrey' },
                  ]}>
                  Diner
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 25 }]}>
          <View style={[styles.col, { flex: 1 }]} />
          <View style={[styles.col, { flex: 3 }]}>
            <Text style={styles.title2}>Date : </Text>
          </View>
          <View style={[styles.col, { flex: 15 }]}>
            <Text style={[styles.title2, styles.bold]}>
              {props.dateState.getDate() < 10
                ? 0 + props.dateState.getDate()
                : props.dateState.getDate()}{' '}
              /{' '}
              {props.dateState.getMonth() < 10
                ? '0' + props.dateState.getMonth()
                : props.dateState.getMonth()}{' '}
              / {props.dateState.getFullYear()} {'('}
              {dayStringFromNumber(props.dateState.getDay())}
              {')'}
            </Text>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 5 }]}>
          <View style={[styles.col, { flex: 1 }]} />
          <View style={[styles.col, { flex: 8 }]}>
            <TouchableOpacity
              style={[styles.col, { flex: 3, marginHorizontal: 2 }]}
              onPress={() => setDatePickerShow(true)}>
              <View>
                <Text style={[styles.dateButton, styles.centered, { marginBottom: 15 }]}>
                  Change Date
                </Text>
              </View>
            </TouchableOpacity>

            {datePickerShow && (
              <DateTimePicker
                testID="dateTimePicker"
                value={props.dateState}
                onChange={dateChange}
              />
            )}
          </View>
          <View style={[styles.col, { flex: 1 }]} />
        </View>

        <View style={[styles.row]}>
          <TouchableOpacity style={[styles.col, { flex: 3 }]} onPress={props.addFunction}>
            <View>
              <Text style={styles.addButton}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};
