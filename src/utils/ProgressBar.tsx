import { View, Text } from 'react-native'
import React from 'react'
import { AppThemeColors } from '../style';

interface ProgressBar {
    progress: number
}

export default function ProgressBar(props: ProgressBar) {

    return (
        <View style={{
            height: 15,
            backgroundColor: "rgba(1, 209, 103,0.2)",
            borderRadius: 35,
            marginTop: 10,
            overflow: "hidden"
        }}>
            <View style={{
                width: `${props.progress}%`,
                flex: 1,
                backgroundColor: AppThemeColors.green,
                transform: [
                    {
                        skewX: '-15deg'
                    }
                ]
            }} />
        </View>
    )
}