import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';

type State {
  time: null,
};

class TimerScreen extends Component<State> {

  constructor() {
    this.state = { time: 1 };
  }

  render() {
    return <Text>{'This is TimerScreen' + this.state.time}</Text>
  }

}

export default TimerScreen;
