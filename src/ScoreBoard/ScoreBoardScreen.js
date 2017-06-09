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
    UIManager
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
        roundScoreForPlayer: '',
        keyboardShowing: false
    };
    
    constructor() {
        super();

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow = () => {
        this.setState({ keyboardShowing: true });
    };

    keyboardDidHide = () => {
        this.setState({ keyboardShowing: false });
    };

    handleExpand = (event, playerName) => {
        // Animate the update
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

        if (playerName == null || this.state.enterScoreForPlayer === playerName) {
            this.setState({ enterScoreForPlayer: '', roundScoreForPlayer: null });
        } else {
            this.setState({ enterScoreForPlayer: playerName, roundScoreForPlayer: null });
        }        

        Keyboard.dismiss();
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
                                <Text style={[globalStyles.playersListTextStyle, globalStyles.textShadowDark]}>
                                    {player.name}
                                </Text>
                                <Text style={[globalStyles.playersListTextStyle, globalStyles.textShadowDark, { paddingRight: 20, fontSize: 40 }]}>
                                    {player.score}
                                </Text>
                            </View>
                            <View style={[styles.scoreForRoundContainer, {height: this.state.enterScoreForPlayer === player.name ? 95 : 0}]}>
                                <View>
                                    <Text style={[globalStyles.textStyleOnBlack, globalStyles.textShadowDark]}>{i18n.t('scoreForRound')}:</Text>
                                </View>
                                <View style={styles.scoreForRoundTextInputAndButtonContainer}>
                                    <TextInput
                                        style={styles.scoreForRoundTextInputStyle}
                                        underlineColorAndroid="transparent"
                                        keyboardType="numeric"
                                        autoCorrect={false}
                                        onSubmitEditing={this.handleEnterScore}
                                        value={this.state.roundScoreForPlayer}
                                        focus={this.state.enterScoreForPlayer === player.name}
                                        onChangeText={text => this.setState({roundScoreForPlayer: text})}
                                    />
                                    <TouchableOpacity
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

    renderKeyboardDummy() {
        if (this.state.keyboardShowing) {
            setTimeout(() => {
                this.scrollView.scrollToEnd();
            }, 50);

            const playersList = this.getSortedPlayersList();
            const currentPlayer = this.state.enterScoreForPlayer;
            const index = playersList.findIndex(p => p.name === currentPlayer);
            const height = 80*index;

            return (
                <View style={{ height: height }}></View>
            ); 
        }
        return null;
    }

    render() {
        return (
            <ScrollView 
                ref={sv => this.scrollView = sv}
                style={styles.containerStyle}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps='handled'
            >
                <View style={styles.titleStyle}>
                    <Text style={[globalStyles.textStyleOnBlack, { fontSize: 32, marginRight: 5 }]}>{i18n.t('round_colon')}</Text>
                    <Text style={[globalStyles.textStyleOnBlack, { fontSize: 52 }]}>{this.props.round + 1}</Text>
                </View>
                <View style={{marginTop: -20, marginBottom: 20}}>
                    <Text style={[globalStyles.textStyleOnBlack, {textAlign: 'center'}]}>{i18n.t('pressNameToEnterScore')}</Text>
                </View>
                {this.renderPlayers()}
                <View style={{ marginTop: 10 }}>
                    <Button 
                        title={i18n.t(this.props.round < 2 ? 'finishRound' : 'finishGame', {round: this.props.round + 1})}
                        onPress={() => {this.props.finishRound(this.props.round)}}
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
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.containerBgColor,
    },
    titleStyle: {
        flex: 1, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center"
    },
    scoreForRoundContainer: {
        flex: 1, 
        justifyContent: "flex-start", 
        alignItems: "flex-start"
    },
    scoreForRoundTextInputAndButtonContainer: {
        flexDirection: "row", 
        justifyContent: "flex-start", 
        alignItems: "center"
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
        players: state.scoreBoard.players
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
