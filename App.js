import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Login from './src/components/Login';
import Drawer from './src/navigation/Drawer';
import { fromRight } from 'react-navigation-transitions';
import { Root } from 'native-base';

const MainNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    Profile: {screen: Drawer}
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