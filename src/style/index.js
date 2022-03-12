import { Dimensions, StyleSheet } from "react-native";

const window = Dimensions.get('window');

export const SCREEN = {
    width: window.width,
    height: window.height
}

export const AppThemeColors = {
    green: '#01D167',
    black: "#222222",
    white: "#FFF",
    darkBlue: '#25345F',
    blueGreen: "#0C365A",
    lightWhite: "#22222226"
}

export const AppFonts = {
    Bold: "Avenir Next Bold",
    Regular: "Avenir Next Regular",
    Medium: "Avenir Next Medium",
    DBold: 'AvenirNext-DemiBold',
}

export const commonStyles = StyleSheet.create({
    whiteContainer: {
        flex: 1,
        backgroundColor: AppThemeColors.white,
    },

    scrollTopOverView20radius: {
        backgroundColor: AppThemeColors.white,
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 20,
        paddingHorizontal: 15,
        flex: 1
    },

    rowCenter: {
        flexDirection: "row",
        alignItems: "center"
    },

    centerItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: AppThemeColors.white
    }
});

