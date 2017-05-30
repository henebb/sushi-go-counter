import React, { Component } from 'react';
import { 
  StyleSheet, 
  StatusBar,
  View,
  Platform,
  ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Font } from 'expo';

import store from './src/store';
import { colors } from './src/style';
import StartScreen from './src/screens/StartScreen';
import AddPlayersScreen from './src/AddPlayers/AddPlayersScreen';
import GameStartedScreen from './src/screens/GameStartedScreen';

const Stack = StackNavigator({
  Start: { screen: StartScreen },
  AddPlayers: { screen: AddPlayersScreen },
  GameStarted: { screen: GameStartedScreen }
  }, {
    headerMode: 'none'
  });

export default class App extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'PaytoneOne': require('./assets/fonts/PaytoneOne.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.containerBgColor }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <Provider store={store}>
        <View style={ styles.viewStyle }>
          <Stack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: colors.containerBgColor,
    paddingTop: Platform.OS == "android" ? 24 : 0
  }
});
