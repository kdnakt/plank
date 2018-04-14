import React, { Component } from 'react';
import {
  PushNotificationIOS,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import Realm from 'realm';
import InputNumber from 'rmc-input-number';
import InputNumberStyles from 'rmc-input-number/lib/styles';
import {
  TargetTime,
  Schema,
} from './schema/Schema';
import Styles from './util/Styles';
import {
  zeroPad,
} from './util/Utils';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';

class ConfigScreen extends Component<{}> {

  static navigationOptions = ({navigation}) => ({
    title: 'Configuration',
  });

  constructor() {
    super();
    this.state = {
      targetTime: 60,
      notifHours: 0,
      notifMinutes: 0,
      useNotif: false,
      realm: null,
      isTimePickerVisible: false,
    };
    this.showTimePicker = this.showTimePicker.bind(this);
    this.hideTimePicker = this.hideTimePicker.bind(this);
    this.handleTimePicked = this.handleTimePicked.bind(this);
    this.getTime = this.getTime.bind(this);
    this.getAlertTime = this.getAlertTime.bind(this);
  }

  componentWillMount() {
    Realm.open(Schema).then(realm => {
      const times = realm.objects(TargetTime.name);
      if (times.length > 0) {
        this.setState({
          targetTime: times[0].seconds,
          notifHours: times[0].notifHours,
          notifMinutes: times[0].notifMinutes,
          useNotif: times[0].useNotif,
          realm: realm,
        });
      }
    })
  }

  save(seconds, notifHours, notifMinutes, useNotif) {
    const realm = this.state.realm;
    realm.write(() => {
      realm.create(TargetTime.name, {
        id: TargetTime.name,
        seconds: seconds,
        notifHours: notifHours,
        notifMinutes: notifMinutes,
        useNotif: useNotif,
      }, true);
    });
    this.setState({
      targetTime: seconds,
      notifHours: notifHours,
      notifMinutes: notifMinutes,
      useNotif: useNotif,
    });
  }

  showTimePicker() {
    this.setState({ isTimePickerVisible: true })
  }

  hideTimePicker() {
    this.setState({ isTimePickerVisible: false })
  }

  handleTimePicked(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const s = this.state;
    this.save(s.targetTime, hour, minute, s.useNotif)
    this.hideTimePicker();
    this.setNotification(hour, minute);
  }

  setNotification(hour, minute) {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
        if (notification.foreground) {
          //alert(notification.message);
        }
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    });
    const time = new Date();
    const notifTime = this.getTime(hour, mimute);
    if (time > notifTime) {
      notifTime.setDate(notifTime.getDate() + 1);
    }

    PushNotificationIOS.scheduleLocalNotification({
      alertTitle: 'alertTitle',
      alertBody: 'alertBody',
      fireDate: notifTime.toISOString(),
    });
  }

  getTime(hour, minute) {
    const time = new Date();
    time.setHours(hour ? hour : this.state.notifHours);
    time.setMinutes(minute ? minute : this.state.notifMinutes);
    time.setSeconds(0);
    time.setMilliseconds(0);
    return time;
  }

  getAlertTime() {
    return zeroPad(this.state.notifHours)
      + ':' + zeroPad(this.state.notifMinutes)
  }

  render() {
    return (
      <View style={Styles.container}>

         <TouchableHighlight onPress={this.showTimePicker}
           //style={Styles.row}
         >
           <Text>
             {"Set Alert Time"}
           </Text>
         </TouchableHighlight>

         <Text>
           {this.getAlertTime()}
         </Text>

         <InputNumber
           min={0}
           max={300}
           onChange={(text) => {
             const s = this.state;
             this.save(text, s.notifHours, s.notifMinutes, s.useNotif);
           }}
           value={this.state.targetTime}
           styles={InputNumberStyles}
           style={Styles.configContainer}
         />

         <DateTimePicker
           mode="time"
           date={this.getTime()}
           format={"HH:mm"}
           isVisible={this.state.isTimePickerVisible}
           onConfirm={this.handleTimePicked}
           onCancel={this.hideTimePicker}
           titleIOS={"Pick a time"}
         />
      </View>
    );
  }
}

export default ConfigScreen;
