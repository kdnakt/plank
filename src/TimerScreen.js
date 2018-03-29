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
import {
  TargetTime,
  PlankLog,
  Schema
} from './schema/Schema';
import Styles from './util/Styles';
import {
  formatTime,
  formatDate,
} from './util/Utils';
import PushNotification from 'react-native-push-notification';
import NativeEventEmitter from 'NativeEventEmitter';

class TimerScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Plank Timer',
    headerLeft: (<TouchableHighlight
      onPress={() => {
        navigation.navigate('Log');
      }}>
        <Text style={Styles.text}>
          {'Log'}
        </Text>
      </TouchableHighlight>
    ),
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
    Realm.open(Schema).then(realm => {
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
      this.updateTargetTime();
      this.resetStopwatch();
    });
    PushNotification.localNotificationSchedule({
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + (60 * 1000)) // in 60 secs
    });
  }

  updateTargetTime() {
    if (this.state.realm) {
      this.setState({
        targetTime: this.state.realm.objects('TargetTime')[0].seconds,
      });
    }
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
      Realm.open(Schema).then(realm => {
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
      alert(`Finished ${formatTime(time)} plank!`);
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
    const { targetTime, timeCount } = this.state;
    return (
      <View style={Styles.container}>
        <Text style={Styles.text}>
          {'TargetTime is: ' + formatTime(targetTime)}
        </Text>

        <Text style={Styles.text}>
          {'This is TimerScreen: ' + formatTime(this.state.timeCount)}
        </Text>

        <TouchableHighlight onPress={this.toggleStopwatch}
         disabled={targetTime <= timeCount}
        >
          <Text style={Styles.buttonText}>
            {!this.state.stopwatchStart ? "Start" : "Stop"}
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.resetStopwatch}>
          <Text style={Styles.buttonText}>
            {!this.state.stopwatchStart ? "Reset" : "Stop & Save"}
          </Text>
        </TouchableHighlight>

        <Progress.Pie
          progress={timeCount / targetTime}
          size={150}
        />
      </View>
    );
  }

}

export default TimerScreen;
