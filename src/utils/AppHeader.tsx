import { View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppLogo, BackArrow } from '../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { AppFonts, AppThemeColors } from '../style';


interface AppHeader {
    title: string,
    children?: any,
    canGoBack?: boolean
}


export function AppHeader(props: AppHeader) {
    const extraSpace = useSafeAreaInsets().top || StatusBar.currentHeight || 20;
    const navigation = useNavigation();

    return (
        <View style={[style.container, {
            paddingTop: extraSpace
        }]}>
            <StatusBar backgroundColor={AppThemeColors.blueGreen} />
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center',
            }}>

                {props.canGoBack && (
                    <TouchableOpacity onPress={navigation.goBack} style={style.backArrowStyle}>
                        <BackArrow />
                    </TouchableOpacity>
                )}
                <View />
                <View style={{ marginRight: 10 }}>
                    <AppLogo />
                </View>
            </View>
            <View style={{ marginHorizontal: 15, marginTop: props.canGoBack ? 6 : -15 }}>
                <Text style={style.titleStyle}>{props.title}</Text>
                <View>
                    {props.children}
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: AppThemeColors.blueGreen,
        paddingBottom: 15
    },

    backArrowStyle: {
        paddingHorizontal: 10,
        height: 40,
        justifyContent: 'center'
    },
    titleStyle: {
        color: AppThemeColors.white,
        fontWeight: "bold",
        fontFamily: AppFonts.Bold,
        fontSize: 22
    }
});