import { Picker } from '@react-native-picker/picker';
import { Text, View, TextInput, Platform, TouchableOpacity, Image } from 'react-native';

import styles from './StyleSheet.js';
import { ignorePress } from './UsefulFunctions.js';

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
  /*CHOCDF: 17.5
ENERC_KCAL: 77
FAT: 0.09
FIBTG: 2.1
PROCNT: 2.05

Math.floor(1.0789 * 100) / 100*/
  return (
    <TouchableOpacity style={[{ height: 100, marginBottom: 10 }]}>
      <View style={[styles.row]}>
        <View style={[styles.col, { flex: 1 }]} />
        <View style={[styles.col, { flex: 7, height: 100 }]}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={[styles.col, styles.foodItem, { flex: 15, height: '100%' }]}>
          <Text style={styles.title}>{props.label}</Text>
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
    </TouchableOpacity>
  );
};
