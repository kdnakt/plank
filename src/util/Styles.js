// @flow

import {
  StyleSheet,
} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 30,
    color: '#F0F',
    marginLeft: 7,
  },
  icon: {
    width: 100,
    height: 100,
  },
  row: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  configContainer: {
    width: 150,
  },
  mainButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 2,
    width: '90%',
  },
});

export default Styles;
