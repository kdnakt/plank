import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import ReactNativeBgTimer from 'react-native-background-timer';

type State = {
  time: null,
};

class TimerScreen extends Component<State> {

  constructor() {
    super();
    this.state = { time: 1 };
    ReactNativeBgTimer.runBackgroundTimer(
      () => this._countUp(),
      1000);
  }

  _countUp() {
    let { time } = this.state;
    if (time > 30) time = 0;
    this.setState({ time: time + 1 });
    console.log(time);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {'This is TimerScreen' + this.state.time}
        </Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 8,
  },
  icon: {
    width: 100,
    height: 100,
  }
});

export default TimerScreen;
