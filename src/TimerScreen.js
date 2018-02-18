import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import ReactNativeBgTimer from 'react-native-background-timer';
import {
  Stopwatch,
  Timer
} from 'react-native-stopwatch-timer';

type State = {
  time: null,
};

class TimerScreen extends Component<State> {

  constructor() {
    super();
    ReactNativeBgTimer.runBackgroundTimer(
      () => this._countUp(),
      1000);
    this.state = {
      timeCount: 1,
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  _countUp() {
    const { timeCount } = this.state;
    this.setState({
      timeCount: timeCount + 1
    });
    console.log(timeCount);
  }

  toggleTimer() {
    this.setState({
      timerStart: !this.state.timerStart,
      timerReset: false,
    });
  }

  resetTimer() {
    this.setState({
      timerStart: false,
      timerReset: true,
    });
  }

  toggleStopwatch() {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false,
    });
  }

  resetStopwatch() {
    this.setState({
      stopwatchStart: false,
      stopwatchReset: true,
    });
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {'This is TimerScreen' + this.state.timeCount}
        </Text>
        <Stopwatch laps msecs
          start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime} />
        <TouchableHighlight onPress={this.toggleStopwatch}>
          <Text style={options.text}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.resetStopwatch}>
          <Text style={options.text}>Reset</Text>
        </TouchableHighlight>
        <Timer msecs
          totalDuration={this.state.totalDuration}
          start={this.state.timerStart}
          reset={this.state.timerReset}
          options={options}
          handleFinish={handleTimerComplete}
          getTime={this.getFormattedTime} />
        <TouchableHighlight onPress={this.toggleTimer}>
          <Text style={options.text}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.resetTimer}>
          <Text style={options.text}>Reset</Text>
        </TouchableHighlight>
      </View>
    );
  }

}

const handleTimerComplete = () => alert("custom completion function");

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
