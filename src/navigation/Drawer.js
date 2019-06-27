import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import Home from '../components/Home';
import Details from '../components/Details';

const HomeStackNavigator = createStackNavigator({
  First: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

const DetailsStackNavigator = createStackNavigator({
  First: {
    screen: Details,
    navigationOptions: ({ navigation }) => ({
      title: 'Details',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Drawer = createDrawerNavigator({
  Home: {
    screen: HomeStackNavigator,
    navigationOptions: {
      drawerLabel: "Home"
    }
  },
  Details: {
    screen: DetailsStackNavigator,
    navigationOptions: {
      drawerLabel: "Details"
    }
  },
});

export default Drawer;