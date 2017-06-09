import { StyleSheet } from 'react-native';
import { Font } from 'expo';

export const colors = {
    containerBgColor: "#000",
    redLight: "#C41E20",
    redDark: "#920202", 
    green: "#ACB736",
    brown: "#41210A",
    gray: "#808080",
    silver: "#C0C0C0",
    lightGray: "#D3D3D3"
}

export const fontFamily = "PaytoneOne"; 

export const globalStyles = StyleSheet.create({
    playersListItemStyle: {
        marginBottom: 10,
        padding: 2,
        paddingLeft: 20,
        borderRadius: 20,
        backgroundColor: colors.redLight,
        flex: 1
    },
    playersListContentStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    playersListTextStyle: {
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
    }
});

