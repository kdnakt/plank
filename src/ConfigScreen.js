import React, { Component } from 'react';
import {
  Platform,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import Realm from 'realm';

const keyboardType = Platform.select({
  ios: 'number-pad',
  android: 'numeric',
});

class ConfigScreen extends Component {

  constructor() {
    super();
    this.state = {
      targetTime: 60,
      realm: null,
    }
  }

  componentWillMount() {
    Realm.open({
      schema: [{
        name: 'TargetTime',
        properties: {seconds: 'int'},
      }],
    }).then(realm => {
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
      realm.create('TargetTime', {seconds: text}, true);
    });
  }

  render() {
    return (
      <View>
         <Text>{"Configuration"}</Text>

         <TextInput
           keyboardType={keyboardType}
           onChangeText={(text) => {
             this.save(text);
           }}
           value={'' + this.state.targetTime}
         />
      </View>
    );
  }
}


export default ConfigScreen;
