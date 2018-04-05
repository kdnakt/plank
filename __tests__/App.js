import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
  expect(filterKeys(tree.toJSON())).toMatchSnapshot();
});

// keys are date and order-of-test based, so just removed them
const filterKeys = (json) => {
  return json;
  if (json.children) {
    json.children.map(child => filterKeys(child))
  }
  if (json.props
    && json.props.navigation
    && json.props.navigation.state
    && json.props.navigation.state.routes) {
    const state = json.props.navigation.state;
    json.props.navigation.state = {
      ...state,
      routes: state.routes.map((route) => {
        const { key, ...others } = route
        return filterKeys(others)
      }),
    }
  }
  return json;
};

jest.mock('react-native-background-timer', () => ({
  stopBackgroundTimer: jest.fn(),
}));
jest.mock('react-native-progress', () => ({
}));
jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  onRegister: jest.fn(),
  onNotification: jest.fn(),
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));
jest.mock('react-native-modal-datetime-picker', () => ({
}));
