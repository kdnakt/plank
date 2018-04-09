import React, { Component } from 'react';
import {
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
import DateTimePicker from 'react-native-modal-datetime-picker';

class ConfigScreen extends Component<{}> {

  static navigationOptions = ({navigation}) => ({
    title: 'Configuration',
  });

  constructor() {
    super();
    this.state = {
      targetTime: 60,
      realm: null,
      isTimePickerVisible: false,
      reservedTime: 540,
    };
    this.showTimePicker = this.showTimePicker.bind(this);
    this.hideTimePicker = this.hideTimePicker.bind(this);
    this.handleTimePicked = this.handleTimePicked.bind(this);
  }

  componentWillMount() {
    Realm.open(Schema).then(realm => {
      const times = realm.objects(TargetTime.name);
      if (times.length > 0) {
        this.setState({
          targetTime: times[0].seconds,
          realm: realm,
        });
      }
    })
  }

  save(text) {
    const realm = this.state.realm;
    realm.write(() => {
      realm.create(TargetTime.name, {
        id: TargetTime.name,
        seconds: text,
      }, true);
    });
    this.setState({
      targetTime: text,
    })
  }

  showTimePicker() {
    this.setState({ isTimePickerVisible: true })
  }

  hideTimePicker() {
    this.setState({ isTimePickerVisible: false })
  }

  handleTimePicked(date) {
    const hour = date.getHours();
    console.log(hour);
    const minute = date.getMinutes();
    console.log(minute);
    this.hideTimePicker();
  }

  getTime() {
    const time = new Date();
    time.setHours(9);
    time.setMinutes(0);
    time.setSeconds(0);
    time.setMilliseconds(0);
    return time;
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
           {this.state.reservedTime}
         </Text>

         <InputNumber
           min={0}
           max={300}
           onChange={(text) => {
             this.save(text);
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
