import React, { Component, PropTypes } from 'react';
import { 
    View, 
    ScrollView, 
    Text, 
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { pushNavigate } from '../app/NavigationReducer';


class ResultScreen extends Component {
    static propTypes = {
        pushNavigate: PropTypes.func.isRequired,
        locale: PropTypes.string,
        players: PropTypes.arrayOf(PropTypes.object),
    };

    render() {
        return (
            <ScrollView>
                <Text>{this.props.players[0].name}</Text>
                <Text>{this.props.players[0].score}</Text>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        players: state.scoreBoard.players,
        locale: state.locale
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pushNavigate: (routeName, props) => dispatch(pushNavigate(routeName, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
