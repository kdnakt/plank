import React, { Component } from 'react';
import {
  Button,
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import ReactNativeBgTimer from 'react-native-background-timer';
import * as Progress from 'react-native-progress';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Realm from 'realm';
import TargetTime from './schema/TargetTime';
import PlankLog from './schema/PlankLog';
import {
  formatTime,
  formatDate,
} from './util/Utils';

class TimerScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Plank Timer',
    headerRight: (<TouchableHighlight
      onPress={() => {
        navigation.navigate('Config');
      }}>
        <Text>
          {'Config'}
        </Text>
      </TouchableHighlight>),
  });

  constructor() {
    super();
    this.state = {
      targetTime: 60,
      timeCount: 0,
      stopwatchStart: false,
    };
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  componentWillMount() {
    Realm.open(TargetTime).then(realm => {
      const times = realm.objects(TargetTime.name);
      if (times.length > 0) {
        this.setState({
          targetTime: times[0].seconds,
          realm: realm,
        });
      } else {
        realm.write(() => {
          realm.create(TargetTime.name, {
            id: TargetTime.name,
            seconds: 30,
          });
        });
      }
    });
    this.props.navigation.addListener('willFocus', () => {
      this.forceUpdate();
    });
  }

  _countUp() {
    const { timeCount, targetTime, stopwatchStart } = this.state;
    const newTime = timeCount + 1;
    const newStart = newTime < targetTime;
    if (stopwatchStart) {
      this.setState({
        timeCount: newTime,
        stopwatchStart: newStart,
      }, () => {
        if (!newStart) {
          this.finish(newTime);
        }
      });
    }
  }

  finish(time) {
    ReactNativeBgTimer.stopBackgroundTimer();
    if (time) {
      Realm.open(PlankLog).then(realm => {
        realm.write(() => {
          const date = new Date();
          realm.create(PlankLog.name, {
            id: date.getTime(),
            date: formatDate(date),
            seconds: time,
          });
          console.log(realm.objects(PlankLog.name));
        });
      });
      alert(`Finished ${this.formatTime(time)} plank!`);
    }
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
        this.finish();
      }
    });
  }

  resetStopwatch() {
    const { timeCount, stopwatchStart } = this.state;
    this.setState({
      stopwatchStart: false,
      timeCount: 0
    }, () => {
      this.finish(stopwatchStart ? timeCount : 0);
    });
  }

  render() {
    const targetTime = this.state.realm ?
      this.state.realm.objects('TargetTime')[0].seconds
      : this.state.targetTime;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {'TargetTime is: ' + formatTime(targetTime)}
        </Text>

        <Text style={styles.text}>
          {'This is TimerScreen: ' + formatTime(this.state.timeCount)}
        </Text>

        <TouchableHighlight onPress={this.toggleStopwatch}>
          <Text style={styles.buttonText}>
            {!this.state.stopwatchStart ? "Start" : "Stop"}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.resetStopwatch}>
          <Text style={styles.buttonText}>
            {!this.state.stopwatchStart ? "Reset" : "Stop & Save"}
          </Text>
        </TouchableHighlight>

        <Progress.Pie
          progress={this.state.timeCount / this.state.targetTime}
          size={150}
        />
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
  },
});

export default TimerScreen;
