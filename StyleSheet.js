import { StyleSheet, Platform, NativeModules } from 'react-native';
import { LinearGradient } from 'react-native-svg';

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

  noMarginBottom: {
    marginBottom: 0,
  },

  AndroidSafeArea: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT + 5 : 0,
  },

  noFeedbackZone: {
    width: '100%',
    height: '100%',
  },

  input: {
    height: 40,
    width: '100%',
    marginTop: 0,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },

  searchButton: {
    height: 40,
    backgroundColor: 'lightgreen',
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 5,
    width: '100%',
    marginTop: 15,
    fontWeight: 400,
    fontSize: 18,
    borderWidth: 1,
    borderLeftWidth: 0,
  },

  closeButton: {
    height: 40,
    backgroundColor: '#990000',
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 5,
    width: '100%',
    marginTop: 15,
    color: 'white',
    fontWeight: 600,
    fontSize: 18,
  },

  addButton: {
    height: 40,
    backgroundColor: 'lightgreen',
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 5,
    width: '100%',
    marginTop: 15,
    fontWeight: 600,
    fontSize: 18,
  },

  uniqueButton: {
    height: 40,
    backgroundColor: 'grey',
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 5,
    width: '100%',
    fontWeight: 500,
    fontSize: 16,
  },

  dateButton: {
    height: 40,
    backgroundColor: 'lightgreen',
    textAlignVertical: 'center',
    textAlign: 'center',
    padding: 5,
    width: '100%',
    fontWeight: 500,
    fontSize: 16,
  },

  foodPageTextInput: {
    width: '100%',
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

  autocomplete: {
    height: 40,
    width: '100%',
    marginTop: 0,
    padding: 10,
    backgroundColor: '#E7E7E7',
    zIndex: 999,
  },

  foodItem: {
    height: 100,
    width: '100%',
    marginTop: 0,
    padding: 10,
    backgroundColor: '#EEEEEE',
  },

  image: {
    height: '100%',
    width: '100%',
  },

  bold: {
    fontWeight: '700',
  },

  title: {
    fontSize: 24,
  },

  title2: {
    fontSize: 18,
  },

  centered: {
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  modal: {
    width: '60%',
    height: '60%',
  },
});

export default styles;
