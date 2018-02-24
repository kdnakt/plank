/**
 * @flow
 */

import { StackNavigator } from 'react-navigation';
import TimerScreen from './src/TimerScreen';

const routes = {
  Timer: {
    screen: TimerScreen,
    navigationOptions: {
      title: 'Plank Timer',
    },
  },
};

const config = {
  initialRouteName: 'Timer',
};

const App = StackNavigator(routes, config);

export default App;
