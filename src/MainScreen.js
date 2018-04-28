import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import Realm from 'realm';
import {
  PlankLog,
  Schema,
} from './schema/Schema';
import Styles from './util/Styles';

class MainScreen extends Component<{}> {

  static navigationOptions = ({navigation}) => ({
    title: 'Plank Timer'
  });

  constructor() {
    super();
    this.state = {
      bestRecord: null,
    }
  }

  componentWillMount() {
    Realm.open(Schema).then(realm => {
      const logs = realm.objects(PlankLog.name);
      if (logs.length) {
        this.setState({
          bestRecord: logs.sorted('seconds', true)[0].seconds,
        });
      }
    });
  }

  render() {
    const bestRecord = this.state.bestRecord;
    return (
      <View style={Styles.container}>
        <Text>
          {"Main Screen"}
        </Text>
        <Text>
          {bestRecord ? `Best Record: ${bestRecord} seconds` : null}
        </Text>
      </View>
    )
  }

}

export default MainScreen;
