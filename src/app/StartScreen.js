import React, { Component, PropTypes } from 'react';
import { 
  Dimensions,
  StyleSheet, 
  Text, 
  ScrollView,
  View, 
  Image, 
  Platform, 
  TouchableNativeFeedback, 
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { pushNavigate } from '../app/NavigationReducer';
import { changeLanguage } from '../i18n/TranslationReducer';
import Button from '../components/Button';
import i18n from '../i18n/translations';
import { colors, fontFamily, globalStyles } from "../style";

const dimension = Dimensions.get('window');

class StartScreen extends Component {
  static propTypes = {
    locale: PropTypes.string,
    changeLanguage: PropTypes.func
  };

  state = {
    imageHeight: StartScreen.calcImageHeight(dimension.width),
    isLandscape: dimension.width > dimension.height
  };

  static calcImageHeight(width) {
    return width > 300 & width < 400 ? 230 : 170;
  }

  onLayout = (e) => {
    const { width, height } = Dimensions.get('window');
    const newHeight = StartScreen.calcImageHeight(width);
    this.setState({ imageHeight: newHeight, isLandscape: width > height });
  };

  changeLocale(locale) {
    this.props.changeLanguage(locale);
  }

  renderLogo() {
    return (
      <Image
        source={require('../../images/logo1.png')}
        style={styles.imageStyle}
      />
    );
  }

  renderFlags(additionalFlagViewStyle) {
    return (
      <View style={ styles.flagContainer }>
        <View style={ [styles.flagView, additionalFlagViewStyle] }>
          <TouchableOpacity 
            style={[styles.flagButton, this.props.locale === 'en' ? {borderColor: colors.redLight}: {}]}
            onPress={() => {this.changeLocale('en')}}
          >
            <Image 
              source={require('../../images/united-kingdom-flag.png')} 
              style={styles.flagStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={ [styles.flagView, additionalFlagViewStyle] }>
          <TouchableOpacity 
            style={[styles.flagButton, this.props.locale === 'sv' ? {borderColor: colors.redLight}: {}]}
            onPress={() => {this.changeLocale('sv')}}
          >
            <Image 
              source={require('../../images/sweden-flag.png')} 
              style={styles.flagStyle}
              />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderStartGameButton() {
    return (
      <Button
        large
        title={i18n.t('startGame', {locale: this.props.locale})}
        onPress={() => { this.props.pushNavigate('AddPlayers'); }}
      />
    );
  }

  getCopyright() {
    return i18n.t('copyrightGamewright', {locale: this.props.locale});
  }

  render() {
    if (this.state.isLandscape) {
      return (
        <View style={landscapeStyles.container} onLayout={this.onLayout}>
          <View style={landscapeStyles.mainContainer}>
            <View style={{ flex: 1 }}>
              {this.renderLogo()}
            </View>
            <View style={{ flex: 1 }}>
              <View style={landscapeStyles.flagsContainer}>
                {this.renderFlags({paddingLeft: 10, paddingRight: 10})}
              </View>
              <View style={landscapeStyles.buttonContainer}>
                {this.renderStartGameButton()}
              </View>
            </View>
          </View>
          <View style={landscapeStyles.footerContainer}>
            <Text style={[globalStyles.textStyleOnBlack, {textAlign: 'center'}]}>
              {this.getCopyright()}
            </Text>
          </View>
        </View>
      );
    }

    // Portrait mode:
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <View style={[styles.imageContainer, {height: this.state.imageHeight}]}>
          {this.renderLogo()}
        </View>
        {this.renderFlags({})}
        <View style={ styles.buttonContainerStyle }>
          {this.renderStartGameButton()}
        </View>
        <View>
          <Text style={globalStyles.textStyleOnBlack}>
            {this.getCopyright()}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.containerBgColor,
    justifyContent: "space-between",
    alignItems: "center"
  },
  imageContainer: {
    alignSelf: "stretch"
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  buttonContainerStyle: {
    alignSelf: "stretch"
  },
  flagContainer: {
    flexDirection: 'row', 
    height: 85
  },
  flagView: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 28,
    paddingRight: 28,
  },
  flagButton: {
    flex: 1, 
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: "transparent"
  },
  flagStyle: {
    width: 100,
    height: 63,
    resizeMode: "cover",
    alignSelf: "center"
  }
});

const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.containerBgColor
  },
  mainContainer: {
    flex: 10, 
    flexDirection: 'row'
  },
  footerContainer: {
    flex: 1
  },
  flagsContainer: {
    flex: 1, 
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    flex: 1, 
    justifyContent: 'flex-start', 
    padding: 10
  }
});

const mapStateToProps = (state) => {
  return {
    locale: state.locale
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushNavigate: (routeName, props) => dispatch(pushNavigate(routeName, props)),
    changeLanguage: (locale) => dispatch(changeLanguage(locale))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
