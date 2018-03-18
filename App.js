/**
 * @flow
 */

import React from 'react';

import { StackNavigator } from 'react-navigation';
import TimerScreen from './src/TimerScreen';
import ConfigScreen from './src/ConfigScreen';
import LogScreen from './src/LogScreen';

const routes = {
  Timer: {
    screen: TimerScreen,
  },
  Config: {
    screen: ConfigScreen,
  },
  Log: {
    screen: LogScreen,
  },
};

const config = {
  initialRouteName: 'Timer',
};

const App = StackNavigator(routes, config);

export default App;
