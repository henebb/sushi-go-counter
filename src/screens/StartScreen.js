import React, { Component } from 'react';
import { 
  Dimensions,
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Platform, 
  TouchableNativeFeedback, 
  TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { colors, fontFamily } from "../style";

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
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={[styles.imageContainer, {height: this.state.imageHeight}]} onLayout={this.onLayout}>
          <Image
            source={require('../../images/logo1.png')}
            style={styles.imageStyle}
          />
        </View>
        <View style={ styles.buttonContainerStyle }>
          <Button
            large
            title="Add Players"
            onPress={() => { navigate('AddPlayers'); }}
          />
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
    justifyContent: "flex-start",
    alignItems: "center"
  },
  imageContainer: {
    alignSelf: "stretch",
    marginBottom: 20
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
});

export default StartScreen;
