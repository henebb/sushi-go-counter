import React, { Component } from 'react';
import { 
  StyleSheet, 
  StatusBar,
  View,
  Platform,
  ActivityIndicator
} from 'react-native';

import { Provider } from 'react-redux';
import { Font, Constants, AppLoading, Asset } from 'expo';

import store from './src/app/store';
import Navigation from './src/app/Navigation';
import { colors } from './src/style';
import i18n, { initI18n } from './src/i18n/translations';

initI18n();

export default class App extends Component {
  state = {
    fontLoaded: false,
    imagesLoaded: false
  };

  async componentDidMount() {
    this.loadFonts();
    this.loadImages();
  }

  async loadFonts() {
    await Font.loadAsync({
      'PaytoneOne': require('./assets/fonts/PaytoneOne.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  async loadImages() {
    const images = [
      require('./images/logo1.png'),
      require('./images/MedalGold.png'),
      require('./images/sweden-flag.png'),
      require('./images/united-kingdom-flag.png'),
    ];

    await Promise.all(
      images.map(image => Asset.fromModule(image).downloadAsync())
    );

    this.setState({ imagesLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded || !this.state.imagesLoaded) {
      return (
        <AppLoading />
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
    paddingTop: Constants.statusBarHeight
  }
});
