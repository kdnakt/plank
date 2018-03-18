// @flow

import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import Realm from 'realm';
import {
  PlankLog,
  Schema,
} from './schema/Schema';
import {
  formatDate,
} from './util/Utils';
import Styles from './util/Styles';

class LogScreen extends Component {

  constructor() {
    super();
    this.state = {
      startDate: formatDate(new Date()),
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.text}>
          {"Log"}
        </Text>

      </View>
    );
  }

}

export default LogScreen;
