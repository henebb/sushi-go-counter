import React, { Component, PropTypes } from 'react';
import { 
    View, 
    ScrollView, 
    Text, 
    StyleSheet, 
    TextInput, 
    Platform,
    Keyboard,
    TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons as Icons } from '@expo/vector-icons';
import Button from '../components/Button';
import { colors, fontFamily } from "../style";
import { addPlayer, updateNewPlayer, removePlayer } from './AddPlayersReducer';

class AddPlayersScreen extends Component {
    static propTypes = {
        players: PropTypes.arrayOf(PropTypes.string),
        newPlayer: PropTypes.string,
        addPlayer: PropTypes.func.isRequired,
        updateNewPlayer: PropTypes.func.isRequired,
        removePlayer: PropTypes.func.isRequired,
    };1

    state = {
        keyboardShowing: false
    };

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

    renderPlayersList() {
        let playersList;
        if (this.props.players.length === 0) {
            playersList = (<Text style={[styles.textStyleOnBlack, {fontSize: 20, paddingLeft: 20}]}>
                No players added. Add below.
            </Text>);
        }
        else {
            playersList = this.props.players.map((player) => {
                return (
                    <View key={player} style={ styles.listItemStyle }>
                        <Text style={[styles.textStyle, styles.textShadowDark]}>
                            {player}
                        </Text>
                        <TouchableOpacity 
                            style={{ paddingRight: 10 }}
                            onPress={() => this.props.removePlayer(player)}
                        >
                            <Icons name="delete-forever" size={32} color={colors.green} style={styles.textShadowDark} />
                        </TouchableOpacity>
                    </View>
                );
            });
        }
        return (
            <View>
                <Text style={styles.textStyleOnBlack}>Players:</Text>
                {playersList}
            </View>
            
        );
    }

    renderKeyboardDummy() {
        if (this.state.keyboardShowing) {
            setTimeout(() => {
                this.scrollView.scrollToEnd();
            }, 50);
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
                <Text style={styles.textStyleOnBlack}>
                    Player Name:
                </Text>
                <View>
                    <TextInput
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={this.props.newPlayer}
                        onChangeText={text => this.props.updateNewPlayer(text)}
                        onSubmitEditing={this.addPlayer}
                        style={styles.textInputStyle}
                        underlineColorAndroid={colors.green}
                    />
                </View>
                <Button 
                    title="Add Player"
                    onPress={this.addPlayer}
                />
            </View>
        );
    }

    renderStartButton() {
        const { navigate } = this.props.navigation;

        if (this.props.players.length < 2 || this.props.players.length > 5) {
            return null; 
        }
        return (
            <View style={{ marginTop: 10 }}>
                <Button 
                    title="Start Game"
                    onPress={() => { navigate('GameStarted'); }}
                />
            </View>
        );
    
    }

    addPlayer = () => {
        this.props.addPlayer(this.props.newPlayer, this.props.players);
    };

    render() {
        return (
            <ScrollView
                ref={sv => this.scrollView = sv}
                style={styles.containerStyle}
                contentContainerStyle={styles.containerContentStyle}
                keyboardShouldPersistTaps="handled"
            >
                {this.renderPlayersList()}
                
                <View>
                    {this.renderAddPlayer()}
                    {this.renderStartButton()}
                    {this.renderKeyboardDummy()}
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
    listItemStyle: {
        marginBottom: 10,
        padding: 2,
        paddingLeft: 20,
        borderRadius: 20,
        backgroundColor: colors.redLight,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textStyle: {
        color: colors.green,
        fontFamily: fontFamily,
        fontSize: 32
    },
    textShadowDark: {
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 6,
        textShadowColor: "#000c"
    },
    textStyleOnBlack: {
        color: colors.green,
        fontFamily: fontFamily,
        fontSize: 16
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
        newPlayer: state.players.newPlayer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPlayer: (player, playerList) => { dispatch(addPlayer(player, playerList)); },
        updateNewPlayer: (name) => { dispatch(updateNewPlayer(name)); },
        removePlayer: (name) => { dispatch(removePlayer(name)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayersScreen);
