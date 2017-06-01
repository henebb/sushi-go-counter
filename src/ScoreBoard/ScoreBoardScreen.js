import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    View,
    Text } from 'react-native';

class ScoreBoardScreen extends Component {
    render() {
        return (
            <View>
                <Text>ScoreBoard</Text>
            </View>
        );
    }
}

export default connect()(ScoreBoardScreen);
