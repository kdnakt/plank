import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
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
    this.renderButton = this.renderButton.bind(this);
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

  renderButton(key) {
    return (
      <TouchableOpacity
        style={Styles.mainButton}
        onPress={() => this.navigate(key)}
      >
        <Text>{key}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const bestRecord = this.state.bestRecord;
    return (
      <View style={Styles.container}>
        <Text style={Styles.mainTitle}>
          {"Let's Get Fit!"}
        </Text>
        <Text>
          {bestRecord ? `Best Record: ${bestRecord} seconds` : null}
        </Text>

        {this.renderButton("Timer")}
        {this.renderButton("Log")}
        {this.renderButton("Config")}
      </View>
    )
  }

}

export default MainScreen;
