import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppThemeColors } from '../style'

interface ErrorView {
    error: string,
    onRefresh: () => void
}

export default function ErrorView(props: ErrorView) {
    return (
        <View>
            <Text style={style.errorText}>{props.error}</Text>
            <Text onPress={props.onRefresh} style={style.linkText}>Retry</Text>
        </View>
    )
}

const style = StyleSheet.create({
    errorText: {
        fontSize: 16,
        textAlign: "center",
        color: AppThemeColors.black
    },
    linkText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 14,
        color: AppThemeColors.green,
        textDecorationLine: 'underline'
    }
})