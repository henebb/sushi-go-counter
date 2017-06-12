import React, { Component, PropTypes } from 'react';
import { 
    View, 
    ScrollView, 
    Text, 
    StyleSheet, 
    TextInput, 
    Platform,
    Keyboard,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    findNodeHandle
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons';
import { pushNavigate } from '../app/NavigationReducer';
import Button from '../components/Button';
import i18n from '../i18n/translations';
import { colors, fontFamily, globalStyles } from "../style";
import { addPlayer, updateNewPlayer, removePlayer } from './AddPlayersReducer';
import { startNewGame } from '../ScoreBoard/ScoreBoardReducer';

class AddPlayersScreen extends Component {
    static propTypes = {
        players: PropTypes.arrayOf(PropTypes.string),
        newPlayer: PropTypes.string,
        addPlayer: PropTypes.func.isRequired,
        updateNewPlayer: PropTypes.func.isRequired,
        removePlayer: PropTypes.func.isRequired,
        pushNavigate: PropTypes.func.isRequired,
        startNewGame: PropTypes.func.isRequired,
        locale: PropTypes.string
    };

    state = {
        inputIsFocused: false
    };

    renderPlayersList() {
        let playersList;
        if (this.props.players.length === 0) {
            playersList = (<Text style={[globalStyles.textStyleOnBlack, {fontSize: 20, paddingLeft: 20}]}>
                {i18n.t('noPlayers_Add', {locale: this.props.locale})}
            </Text>);
        }
        else {
            playersList = this.props.players.map((player) => {
                return (
                    <View key={player} style={ globalStyles.playersListItemStyle }>
                        <View style={ globalStyles.playersListContentStyle }>
                            <Text style={[globalStyles.playersListTextStyle, globalStyles.textShadowDark, { flex: 0.88 }]}>
                                {player}
                            </Text>
                            <TouchableOpacity 
                                style={{ flex: 0.12, backgroundColor: "transparent" }}
                                onPress={() => this.props.removePlayer(player)}
                            >
                                <Icons name="delete-forever" size={32} color={colors.green} style={globalStyles.textShadowDark} />
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            });
        }
        return (
            <View>
                <Text style={globalStyles.textStyleOnBlack}>{i18n.t('players', {locale: this.props.locale})}:</Text>
                {playersList}
            </View>
            
        );
    }

    inputFocused = () => {
        this.setState({ inputIsFocused: true });
        setTimeout(() => {
            let scrollResponder = this.refs.scrollView.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                findNodeHandle(this.refs.textInput),
                110, //additionalOffset
                true
            );
        }, 50);
    };

    renderDummyKeyboardSpacer() {
        if (Platform.OS === 'ios') {
            return null;
        }
        if (this.state.inputIsFocused) {
            return (
                <View style={{ height: 300 }}></View>
            );
        }
        return null;
    }

    renderAddPlayer() {
        if (this.props.players.length > 4) {
            return null;
        }
        return (
            <View>
                <Text style={globalStyles.textStyleOnBlack}>
                    {i18n.t('playerName', {locale: this.props.locale})}:
                </Text>
                <View style={styles.textInputWrapperStyle}>
                    <TextInput
                        ref="textInput"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={this.props.newPlayer}
                        onChangeText={text => this.props.updateNewPlayer(text)}
                        onSubmitEditing={this.addPlayer}
                        onFocus={() => this.inputFocused()}
                        onBlur={() => this.setState({ inputIsFocused: false })}
                        style={styles.textInputStyle}
                        underlineColorAndroid={colors.green}
                    />
                </View>
                <Button 
                    title={i18n.t('addPlayer', {locale: this.props.locale})}
                    onPress={this.addPlayer}
                />
            </View>
        );
    }

    renderStartButton() {
        if (this.props.players.length < 2 || this.props.players.length > 5) {
            return null; 
        }
        return (
            <View style={{ marginTop: 10 }}>
                <Button 
                    title={i18n.t('startGame', {locale: this.props.locale})}
                    onPress={this.startGame}
                />
            </View>
        );
    }

    startGame = ()  => {
        Keyboard.dismiss(); 
        this.props.startNewGame(this.props.players);
        this.props.pushNavigate('ScoreBoard');
    };

    addPlayer = () => {
        if (this.props.players.findIndex(pl => pl === this.props.newPlayer) !== -1) {
            // Player already exists.   
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity(i18n.t('playerAlreadyExistsTitle', {locale: this.props.locale}), ToastAndroid.SHORT, ToastAndroid.TOP);
            } else {
                Alert.alert(i18n.t('playerAlreadyExistsTitle', {locale: this.props.locale}), i18n.t('playerAlreadyExistsMessage', {locale: this.props.locale}));
            }
        } else {
            // Add player
            this.props.addPlayer(this.props.newPlayer, this.props.players);
            this.setState({inputIsFocused: false});
            this.refs.textInput.blur();
        }
    };

    render() {
        return (
            <ScrollView
                ref="scrollView"
                style={styles.containerStyle}
                contentContainerStyle={styles.containerContentStyle}
                keyboardShouldPersistTaps="handled"
            >
                {this.renderPlayersList()}
                
                <View>
                    {this.renderAddPlayer()}
                    {this.renderStartButton()}
                    {this.renderDummyKeyboardSpacer()}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.containerBgColor
    },
    containerContentStyle: {
        alignItems: "stretch", 
        backgroundColor: colors.containerBgColor
    },
    textInputWrapperStyle: {
        ...Platform.select({
            ios: {
                borderBottomColor: colors.green, 
                borderBottomWidth: 2, 
                marginBottom: 10
            }
        })
    },
    textInputStyle: {
        height: 45,
        fontFamily: fontFamily,
        fontSize: 32,
        color: colors.green,
        paddingLeft: 10
    }
});

const mapStateToProps = (state) => {
    return {
        players: state.players.playerList,
        newPlayer: state.players.newPlayer,
        locale: state.locale
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPlayer: (player, playerList) => { dispatch(addPlayer(player, playerList)); },
        updateNewPlayer: (name) => { dispatch(updateNewPlayer(name)); },
        removePlayer: (name) => { dispatch(removePlayer(name)); },
        pushNavigate: (routeName, props) => dispatch(pushNavigate(routeName, props)),
        startNewGame: (players) => dispatch(startNewGame(players))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayersScreen);
