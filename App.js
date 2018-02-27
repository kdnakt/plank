/**
 * @flow
 */

import React from 'react';
import {
  Button,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import TimerScreen from './src/TimerScreen';
import ConfigScreen from './src/ConfigScreen';

const routes = {
  Timer: {
    screen: TimerScreen,
    navigationOptions: {
      title: 'Plank Timer',
      headerRight: (<Button
        title='Config'
      />),
    },
  },
  Config: {
    screen: ConfigScreen,
  }
};

const config = {
  initialRouteName: 'Timer',
};

const App = StackNavigator(routes, config);

export default App;
