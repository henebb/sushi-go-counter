import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';

import { popNavigate } from './NavigationReducer';
import StartScreen from './StartScreen';
import AddPlayersScreen from '../AddPlayers/AddPlayersScreen';
import ScoreBoardScreen from '../ScoreBoard/ScoreBoardScreen';

export const Navigator = StackNavigator({
        Start: { screen: StartScreen },
        AddPlayers: { screen: AddPlayersScreen },
        ScoreBoard: { screen: ScoreBoardScreen }
    }, 
    {
        headerMode: 'none'
    }
);

class Navigation extends Component {
    // Handle Android back button
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        if (this.props.navigation.index === 0) {
            return false;
        }
        this.props.popNavigate();
        return true;
    };

    render() {
        return (
            <Navigator 
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.navigation
                })}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        navigation: state.nav
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        popNavigate: () => dispatch(popNavigate())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
