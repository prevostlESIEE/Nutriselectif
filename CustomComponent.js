import { Picker } from '@react-native-picker/picker';
import { Text, View, TextInput, Platform } from 'react-native';

import styles from './StyleSheet.js';

export const TextField = (props) => {
  let textValue;
  return (
    <>
      <View style={styles.row}>
        <Text style={[styles.fieldLabel]}>{props.label}</Text>
      </View>
      <View style={styles.row}>
        <View style={(styles.col, { flex: 1 })} />
        <View style={(styles.col, { flex: 4 })}>
          <TextInput
            style={styles.input}
            keyboardType={props.keyboardType}
            defaultValue={props.state}
            onChangeText={(text) => {
              textValue = text;
            }}
            onEndEditing={() => {
              props.changeFunction(textValue);
            }}
          />
        </View>
        <View style={(styles.col, { flex: 1 })} />
      </View>
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
          <View style={(styles.col, { flex: 1 })} />
          <View style={(styles.col, { flex: 4 })}>
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
          <View style={(styles.col, { flex: 1 })} />
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
          <View style={(styles.col, { flex: 1 })} />
          <View style={(styles.col, { flex: 4 })}>
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
          <View style={(styles.col, { flex: 1 })} />
        </View>
      </>
    );
  }
};

export const DisplayField = (props) => {
  return (
    <>
      <View style={styles.row}>
        <View style={(styles.col, { flex: 1 })} />
        <View style={(styles.col, { flex: 8 })}>
          <Text style={styles.displayField}>{props.displayedText}</Text>
        </View>
        <View style={(styles.col, { flex: 1 })} />
      </View>
    </>
  );
};
