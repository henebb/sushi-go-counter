import React, { Component } from 'react';
import { 
  Dimensions,
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Platform, 
  TouchableNativeFeedback, 
  TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';
import { pushNavigate } from '../app/NavigationReducer';
import Button from '../components/Button';
import i18n from '../i18n/translations';
import { colors, fontFamily, globalStyles } from "../style";

const initialWidth = Dimensions.get('window').width;

class StartScreen extends Component {
  state = {
    imageHeight: StartScreen.calcImageHeight(initialWidth)
  };

  static calcImageHeight(width) {
    return width > 300 & width < 400 ? 230 : 190;
  }

  onLayout = (e) => {
    const { width } = Dimensions.get('window');
    const newHeight = StartScreen.calcImageHeight(width);
    this.setState({ imageHeight: newHeight });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.imageContainer, {height: this.state.imageHeight}]} onLayout={this.onLayout}>
          <Image
            source={require('../../images/logo1.png')}
            style={styles.imageStyle}
          />
        </View>
        <View style={ styles.flagContainer }>
          <TouchableOpacity style={ styles.flagButton }>
            <Image 
              source={require('../../images/united-kingdom-flag.png')} 
              style={styles.flagStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={ styles.flagButton }>
            <Image 
              source={require('../../images/sweden-flag.png')} 
              style={styles.flagStyle}
              />
          </TouchableOpacity>
        </View>
        <View style={ styles.buttonContainerStyle }>
          <Button
            large
            title={i18n.t('startGame')}
            onPress={() => { this.props.pushNavigate('AddPlayers'); }}
          />
        </View>
        <View>
          <Text style={globalStyles.textStyleOnBlack}>
            Sushi Go!™ is property of Gamewright®
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
    height: 50
  },
  flagButton: {
    flex: 1, 
    justifyContent: 'center'
  },
  flagStyle: {
    width: 100,
    resizeMode: "contain",
    alignSelf: "center"
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    pushNavigate: (routeName, props) => dispatch(pushNavigate(routeName, props))
  }
};

export default connect(null, mapDispatchToProps)(StartScreen);
