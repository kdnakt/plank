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

class ConfigScreen extends Component {

  constructor() {
    super();
    this.state = {
      targetTime: 60,
      realm: null,
    }
  }

  componentWillMount() {
    Realm.open(Schema).then(realm => {
      const times = realm.objects('TargetTime');
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

  render() {
    return (
      <View style={Styles.container}>
         <Text style={Styles.text}>
           {"Configuration"}
         </Text>

         <InputNumber
           min={0}
           max={300}
           onChange={(text) => {
             this.save(text);
           }}
           value={this.state.targetTime}
           styles={InputNumberStyles}
           style={{ width: 150 }}
         />
      </View>
    );
  }
}

export default ConfigScreen;
