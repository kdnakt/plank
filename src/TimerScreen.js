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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {'This is TimerScreen: ' + this.state.timeCount}
        </Text>

        <TouchableHighlight onPress={this.toggleStopwatch}>
          <Text style={options.text}>
            {!this.state.stopwatchStart ? "Start" : "Stop"}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.resetStopwatch}>
          <Text style={options.text}>{"Reset"}</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#F0F',
    marginLeft: 7,
  }
};

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
