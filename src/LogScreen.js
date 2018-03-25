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

const LOG_COUNT = 7;

class LogScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Plank Log',
  });

  constructor() {
    super();
    this.state = {
      startDate: formatDate(new Date()),
    };
    this.showNewerLog = this.showNewerLog.bind(this);
    this.showOlderLog = this.showOlderLog.bind(this);
  }

  componentWillMount() {
    Realm.open(Schema).then(realm => {
      const logs = realm.objects(PlankLog.name);
      this.setState({
        logs: logs.sorted(PlankLog.primaryKey, true),
        index: 0,
      });
    })
  }

  showNewerLog() {
    this.showLog(- LOG_COUNT);
  }

  showOlderLog() {
    this.showLog(LOG_COUNT);
  }

  showLog(count) {
    this.setState({
      index: this.state.index + count,
    });
  }

  renderLogs() {
    const index = this.state.index;
    return (<View>
      <View style={Styles.row}>
        <TouchableHighlight
          disabled={index <= 0}
          onPress={this.showNewerLog}
        >
          <Text style={Styles.text}>
            {"◀︎"}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          disabled={this.state.logs.length <= index + LOG_COUNT}
          onPress={this.showOlderLog}
        >
          <Text style={Styles.text}>
            {"▶︎"}
          </Text>
        </TouchableHighlight>
      </View>

      <FlatList
        data={this.state.logs.slice(index, index + LOG_COUNT)}
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
    </View>);
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
