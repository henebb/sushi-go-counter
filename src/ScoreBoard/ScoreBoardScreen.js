import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { 
    View,
    ScrollView,
    Text,
    TextInput,
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    findNodeHandle
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Button from '../components/Button';
import i18n from '../i18n/translations';
import { colors, globalStyles } from '../style';
import { pushNavigate } from '../app/NavigationReducer';
import { addScoreForPlayer, finishRound } from './ScoreBoardReducer';

class ScoreBoardScreen extends Component {
    state = {
        enterScoreForPlayer: '',
        roundScoreForPlayer: ''
    };
    
    constructor() {
        super();

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    handleExpand = (event, playerName) => {
        // Animate the update
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        if (playerName == null || this.state.enterScoreForPlayer === playerName) {
            this.setState({ enterScoreForPlayer: '', roundScoreForPlayer: null });
            Keyboard.dismiss();
        } else {
            this.setState({ enterScoreForPlayer: playerName, roundScoreForPlayer: null });
            this.refs[playerName].focus();
        }
    };

    handleEnterScore = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        this.props.addScoreForPlayer(this.state.enterScoreForPlayer, this.state.roundScoreForPlayer);

        this.setState({ roundScoreForPlayer: '' });
        this.handleExpand();
    };

    getSortedPlayersList() {
        let playersList = this.props.players.slice(0); // Make a copy
        playersList.sort((a, b) => b.score - a.score);
        return playersList;
    }

    inputFocused = (playerName) => {
        console.log('input focused', playerName);
        setTimeout(() => {
            let scrollResponder = this.refs.scrollView.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                findNodeHandle(this.refs[playerName]),
                Platform.OS === 'ios' ? 110 : 250, //additionalOffset
                true
            );
        }, 10);
    };

    scrollToMain() {
        let scrollResponder = this.refs.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            findNodeHandle(this.refs.main),
            0,
            true
        );
    }

    inputBlurred = () => {
        this.scrollToMain();
    };

    renderPlayers() {
        const playersList = this.getSortedPlayersList();
        return playersList.map(player => {
                return (
                    <TouchableWithoutFeedback
                        key={player.name} 
                        onPress={(e) => this.handleExpand(e, player.name)}
                    >
                        <View style={ globalStyles.playersListItemStyle }>
                            <View style={ globalStyles.playersListContentStyle }>
                                <Text style={[globalStyles.playersListTextStyle, globalStyles.textShadowDark, styles.playerNameStyle]}>
                                    {player.name}
                                </Text>
                                <Text style={[globalStyles.playersListTextStyle, globalStyles.textShadowDark, styles.scoreStyle]}>
                                    {player.score}
                                </Text>
                            </View>
                            <View style={[styles.scoreForRoundContainer, {height: this.state.enterScoreForPlayer === player.name ? 95 : 0}]}>
                                <View>
                                    <Text style={[globalStyles.textStyleOnBlack, globalStyles.textShadowDark]}>{i18n.t('scoreForRound', {locale: this.props.locale})}:</Text>
                                </View>
                                <View style={styles.scoreForRoundTextInputAndButtonContainer}>
                                    <TextInput
                                        style={[styles.scoreForRoundTextInputStyle, {opacity: this.state.enterScoreForPlayer === player.name ? 1 : 0}]}
                                        ref={player.name}
                                        underlineColorAndroid="transparent"
                                        keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"}
                                        autoCorrect={false}
                                        onFocus={() => this.inputFocused(player.name)}
                                        onBlur={this.inputBlurred}
                                        onSubmitEditing={this.handleEnterScore}
                                        value={this.state.roundScoreForPlayer}
                                        onChangeText={text => this.setState({roundScoreForPlayer: text})}
                                    />
                                    <TouchableOpacity
                                        style={{ flex: 1 }}
                                        onPress={this.handleEnterScore}
                                    >
                                        <FontAwesome name="check-circle-o" size={50} color={colors.green} style={globalStyles.textShadowDark}  />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>                            
                    </TouchableWithoutFeedback>
                );
        });
    }

    timeToFinishGame() {
        return this.props.round >= 2;
    }

    handleFinishButton = () => {
        if (this.timeToFinishGame()) {
            this.props.pushNavigate('Result');
        } else {
            this.props.finishRound(this.props.round);
        }
    };

    renderKeyboardDummy() {
        if (Platform.OS === 'ios') {
            return null;
        }
        return (
            <View style={{height: 200}}></View>
        );
    }

    render() {
        return (
            <ScrollView 
                ref="scrollView"
                style={styles.containerStyle}
                keyboardShouldPersistTaps='handled'
            >
                <View ref="main" style={styles.titleStyle}>
                    <Text style={[globalStyles.textStyleOnBlack, { fontSize: 32, marginRight: 5 }]}>{i18n.t('round_colon', {locale: this.props.locale})}</Text>
                    <Text style={[globalStyles.textStyleOnBlack, { fontSize: 52 }]}>{this.props.round + 1}</Text>
                </View>
                <View style={styles.subtitleStyle}>
                    <Text style={[globalStyles.textStyleOnBlack, {textAlign: 'center'}]}>{i18n.t('pressNameToEnterScore', {locale: this.props.locale})}</Text>
                </View>
                {this.renderPlayers()}
                <View style={{ marginTop: 10 }}>
                    <Button 
                        title={i18n.t(this.timeToFinishGame() ? 'finishGame' : 'finishRound', {locale: this.props.locale, round: this.props.round + 1})}
                        onPress={this.handleFinishButton}
                    />
                </View>
                {this.renderKeyboardDummy()}
            </ScrollView>
        );
    }

    static propTypes = {
        round: PropTypes.number,
        players: PropTypes.arrayOf(PropTypes.object),
        pushNavigate: PropTypes.func.isRequired,
        addScoreForPlayer: PropTypes.func.isRequired,
        finishRound: PropTypes.func.isRequired,
        locale: PropTypes.string
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.containerBgColor
    },
    titleStyle: {
        flex: 1, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center",
        marginTop: -20
    },
    subtitleStyle: {
        ...Platform.select({
            ios: {
                marginTop: -10, 
                marginBottom: 10
            },
            android: {
                marginTop: -20, 
                marginBottom: 10
            }
        })
    },
    scoreForRoundContainer: {
        flex: 1, 
        justifyContent: "flex-start", 
        alignItems: "flex-start"
    },
    playerNameStyle: {
        flex: 0.75
    },
    scoreStyle: {
        fontSize: 40, 
        textAlign: "right", 
        marginRight: 10, 
        paddingRight: 5,
        backgroundColor: "transparent", 
        flex: 0.25
    },
    scoreForRoundTextInputAndButtonContainer: {
        flexDirection: "row", 
        justifyContent: "flex-start", 
        alignItems: "center",
        marginTop: Platform.OS === "ios" ? 5 : 0
    },
    scoreForRoundTextInputStyle: {
        backgroundColor: "#fff", 
        borderRadius: 5, 
        fontSize: 30, 
        paddingLeft: 15, 
        paddingRight: 15, 
        width: 135, 
        marginRight: 10
    }
});

const mapStateToProps = (state) => {
    return {
        round: state.scoreBoard.round,
        players: state.scoreBoard.players,
        locale: state.locale
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        pushNavigate: (routeName, props) => dispatch(pushNavigate(routeName, props)),
        addScoreForPlayer: (player, score) => dispatch(addScoreForPlayer(player, score)),
        finishRound: (currentRound) => dispatch(finishRound(currentRound))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoardScreen);
