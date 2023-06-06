import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Platform, NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  col: {
    flexDirection: 'column',
  },
  centeredCol: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },

  AndroidSafeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT + 5 : 0,
  },

  input: {
    height: 40,
    width: '100%',
    marginTop: 0,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },

  fieldLabel: {
    margin: 12,
    marginBottom: 0,
    marginTop: 0,
    padding: 10,
    paddingBottom: 5,
    textAlignVertical: 'center',
  },

  pickerView: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },

  picker: {
    height: 40,
    width: 250,
  },

  pickerItem: {
    fontSize: 15,
    height: 40,
  },

  pickerIos: {
    height: 120,
    width: '100%',
    marginTop: -25,
    alignItems: 'center',
    alignSelf: 'center',
  },

  pickerItemIos: {
    fontSize: 15,
    height: 120,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  displayField: {
    fontSize: 17,
    marginTop: 20,
  },
});

export default styles;
