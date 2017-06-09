import React, { Component } from 'react';
import { 
  StyleSheet, 
  StatusBar,
  View,
  Platform,
  ActivityIndicator
} from 'react-native';

import { Provider } from 'react-redux';
import { Font } from 'expo';

import store from './src/app/store';
import Navigation from './src/app/Navigation';
import { colors } from './src/style';
import i18n, { initI18n } from './src/i18n/translations';

initI18n();

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
          <Navigation />
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
