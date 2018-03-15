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
      <View style={styles.container}>
         <Text style={styles.text}>
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

export default ConfigScreen;
