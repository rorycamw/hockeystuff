import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './view/login.js'
import SignUp from './view/signup.js'
import Dashboard from './view/dashboard.js'

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Login
    },
    Signup: {
      screen: SignUp
    },
    Dashboard: {
      screen: Dashboard
    }
  },
  {
    initialRouteName: 'Home'
  }

);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

// 





