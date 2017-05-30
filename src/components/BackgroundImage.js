import React, { Component } from 'react';
import { Image , StyleSheet} from 'react-native';

const BackgroundImage = ({ children }) => {
    return (
        <Image source={require(`../../images/card-bg.png`)} style={styles.backgroundImage}>
            {children}
        </Image>
    );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default BackgroundImage;
