// @flow

import React, { Component } from 'react';
import {
  FlatList,
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
  formatDateTime,
} from './util/Utils';
import Styles from './util/Styles';

class LogScreen extends Component {

  constructor() {
    super();
    this.state = {
      startDate: formatDate(new Date()),
    }
  }

  componentWillMount() {
    Realm.open(Schema).then(realm => {
      const logs = realm.objects(PlankLog.name);
      this.setState({
        logs: logs.sorted(PlankLog.primaryKey, true),
      });
    })
  }

  renderLogs() {
    return (
      <FlatList
        data={this.state.logs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const d = new Date(item.id);
          return (
            <Text style={Styles.text}>
              {formatDateTime(d) + ' - ' + item.seconds}
            </Text>
          );
        }}
      />
    );
  }

  render() {
    return (
      <View style={Styles.container}>
        {this.state.logs ?
          this.renderLogs() :
          <Text style={Styles.text}>
            {"No Log. Let's excercise!"}
          </Text>
        }
      </View>
    );
  }

}

export default LogScreen;
