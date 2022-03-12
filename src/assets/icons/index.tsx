import React from 'react'
import { Image, Text, View, ImageSourcePropType, ImageProps, TouchableOpacity } from "react-native"
import FastImage from 'react-native-fast-image'
import { AppFonts } from '../../style'
import AppImages from '../images'


interface ShowImageFromResource {
    source: any,
    size?: number
}

interface Toggle {
    show: boolean,
    onChange: (status: boolean) => void
}

export const AppLogo = () => {
    return (
        <FastImage
            source={require('../images/logo.jpg')}
            resizeMode='contain'
            style={{
                width: 45,
                height: 45,
            }}
        />
    )
}

export const PriceTag = () => {
    return (
        <View style={{
            backgroundColor: "#01D167",
            width: 40,
            height: 24,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                // fontWeight: 'bold',
                fontFamily: AppFonts.Bold,
                color: "#FFF"
            }}>S$</Text>
        </View>
    )
}


export const BackArrow = () => {
    return (
        <Image
            source={require('../images/left-arrow.png')}
            resizeMode='contain'
            style={{
                width: 20,
                height: 20,
            }}
        />
    )
}

export const ShowImageFromResource = (props: ShowImageFromResource) => {

    const size = props.size || 26

    return (
        <FastImage
            source={props.source}
            resizeMode='contain'
            style={{
                height: size,
                width: size
            }}
        />
    )
}


export const ToggleButton = (props: Toggle) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.onChange && props.onChange(!props.show)
            }}
            style={{
                height: 30,
                width: 30,
            }}>
            <ShowImageFromResource
                source={props.show ? AppImages.ToggleON : AppImages.ToggleOFF}
                size={25}
            />
        </TouchableOpacity>
    )
}