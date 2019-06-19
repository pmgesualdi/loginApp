import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Login from './src/components/Login';
import Home from './src/components/Home';
import Details from './src/components/Details';
import { fromRight } from 'react-navigation-transitions';
import { Root } from 'native-base';

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Details: Details
  }
)

const MainNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    Profile: {screen: TabNavigator}
  },
  {
      initialRouteName: 'Login',
      transitionConfig: () => fromRight(),
      headerMode: 'none',
      navigationOptions: {
        headerVisible: false,
      }
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;