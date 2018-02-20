import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import ReactNativeBgTimer from 'react-native-background-timer';

type State = {
  time: null,
};

class TimerScreen extends Component<State> {

  constructor() {
    super();
    this.state = {
      timeCount: 0,
      stopwatchStart: false,
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  _countUp() {
    const { timeCount } = this.state;
    this.setState({
      timeCount: timeCount + 1
    });
  }

  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
    }, () => {
      if (this.state.stopwatchStart) {
        ReactNativeBgTimer.runBackgroundTimer(
          () => this._countUp(),
          1000);
      } else {
        ReactNativeBgTimer.stopBackgroundTimer();
      }
    });
  }

  resetStopwatch() {
    this.setState({
      stopwatchStart: false,
      timeCount: 0
    }, () => {
      ReactNativeBgTimer.stopBackgroundTimer();
    });
  }

  formatTime() {
    const { timeCount } = this.state;
    const seconds = timeCount % 60;
    const minutes = (timeCount - seconds) / 60;
    return this.zeroPad(minutes) + ':' + this.zeroPad(seconds);
  }

  zeroPad(time) {
    return `${('00' + time).slice(-2)}`;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {'This is TimerScreen: ' + this.formatTime()}
        </Text>

        <TouchableHighlight onPress={this.toggleStopwatch}>
          <Text style={styles.buttonText}>
            {!this.state.stopwatchStart ? "Start" : "Stop"}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.resetStopwatch}>
          <Text style={styles.buttonText}>{"Reset"}</Text>
        </TouchableHighlight>
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
  buttonText: {
    fontSize: 30,
    color: '#F0F',
    marginLeft: 7,
  },
  icon: {
    width: 100,
    height: 100,
  }
});

export default TimerScreen;
