/**
 * @flow
 */

import { StackNavigator } from 'react-navigation';
import TimerScreen from './src/TimerScreen';
import ConfigScreen from './src/ConfigScreen';

const routes = {
  Timer: {
    screen: TimerScreen,
    navigationOptions: {
      title: 'Plank Timer',
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
