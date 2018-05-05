import React, { Component } from 'react';
import {
  Button,
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
    };
    this.navigate = this.navigate.bind(this);
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

  navigate(key) {
    this.props.navigation.navigate(key);
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
        <Button
          title={"Timer"}
          onPress={() => this.navigate("Timer")}
        />
        <Button
          title={"Log"}
          onPress={() => this.navigate("Log")}
        />
        <Button
          title={"Config"}
          onPress={() => this.navigate("Config")}
        />
      </View>
    )
  }

}

export default MainScreen;
