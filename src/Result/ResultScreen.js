import React, { Component, PropTypes } from 'react';
import { 
    View, 
    ScrollView, 
    Text, 
    StyleSheet,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { MaterialCommunityIcons as MCIcons, Ionicons, Foundation, Entypo } from '@expo/vector-icons';
import { newGame } from '../app/NavigationReducer';
import Button from '../components/Button';
import { colors, globalStyles } from '../style';
import i18n from '../i18n/translations';

class ResultScreen extends Component {
    static propTypes = {
        newGame: PropTypes.func.isRequired,
        locale: PropTypes.string,
        players: PropTypes.arrayOf(PropTypes.object),
    };

    renderResult() {
        let playersList = this.props.players.slice(0);
        playersList.sort((a, b) => b.score - a.score);

        return playersList.map((player, index) => {
            let fontSize = 18;
            let fontColor = colors.green;
            let scoreGlowStyle = {
                textAlign: "center",
                textShadowOffset: { width: 1, height: 1 }
            };

            let trophy = null;
            if (index === 0) {
                fontSize = 40;
                scoreGlowStyle = {
                    ...scoreGlowStyle,
                    textShadowRadius: 20,
                    textShadowColor: "gold"
                };
                trophy = <MCIcons name="trophy-award" size={fontSize*1.5} color="gold" style={[scoreGlowStyle, styles.trophyIconStyle]} />;
                fontColor = "gold";
            } else if ( index === 1) {
                fontSize = 32;
                scoreGlowStyle = {
                    ...scoreGlowStyle,
                    textShadowRadius: 16,
                    textShadowColor: "silver"
                };
                trophy = <Foundation name="trophy" size={fontSize*1.5} color="silver" style={[scoreGlowStyle, styles.trophyIconStyle]} />;
                fontColor = "silver";               
            } else if ( index === 2) {
                fontSize = 24;
                scoreGlowStyle = {
                    ...scoreGlowStyle,
                    textShadowRadius: 12,
                    textShadowColor: "#CD7F32"
                }; 
                trophy = <Ionicons name="md-trophy" size={fontSize*1.5} color="#CD7F32" style={[scoreGlowStyle, styles.trophyIconStyle]} />;
                fontColor = "#CD7F32";                             
            } else {
                trophy = <Image source={require("../../images/MedalGold.png")} style={{height: 30, width: 40, marginTop: 5, marginBottom: 5, resizeMode: "contain"}} />
            }
            return(
                <View key={player.name} style={styles.playerScoreRow}>
                    <Text style={[globalStyles.textStyleOnBlack, scoreGlowStyle, {fontSize: fontSize*1.2, color: fontColor, width: 50, }]}>
                        {index+1}
                    </Text>
                    {trophy}
                    <Text style={[globalStyles.textStyleOnBlack, scoreGlowStyle, { fontSize, color: fontColor, flex: 1, paddingLeft: 15, textAlign: "left" }]}>
                        {player.name}
                    </Text>
                    <Text style={[globalStyles.textStyleOnBlack, scoreGlowStyle, { fontSize, color: fontColor, width: 80, textAlign: "right", paddingRight: 5 }]}>
                        {player.score}
                    </Text>
                </View>
            );
        })
    }

    render() {
        return (
            <View
                style={styles.containerStyle}
            >
                <View style={{flex: 1}}>
                    {this.renderResult()}
                </View>
                <View style={{height: 80}}>
                    <Button 
                        title={i18n.t("newGame", {locale: this.props.locale})}
                        onPress={() => this.props.newGame()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: colors.containerBgColor
    },
    playerScoreRow: { 
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: 'space-between'
    },
    trophyIconStyle: {
        width: 40, 
        textAlign: "center"
    }
});

const mapStateToProps = (state) => {
    return {
        players: state.scoreBoard.players,
        locale: state.locale
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        newGame: () => dispatch(newGame())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
