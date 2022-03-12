import { View, Text, StyleSheet, TouchableOpacityBase, TouchableOpacity, Image, TextInput, Alert, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { AppFonts, AppThemeColors, commonStyles } from '../style'
import { AppHeader } from '../utils/AppHeader'
import { PRICE_RANGE } from '../constants/data'
import { formate_price, formate_price_without_currency } from '../constants/PriceFormater'
import AppImages from '../assets/images'
import { PriceTag, ShowImageFromResource } from '../assets/icons'
import AppValidator from '../constants/Validation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AppButton from '../utils/AppButton'
import { KeyboardSpaceProvider } from '../utils/KeyboardViewIOS'
import { useDispatch, useSelector } from 'react-redux'
import { setMaxSpendingLimit } from '../store/actions/DashboardAction'

const margin = '4%'

export default function Spending(props: any) {

    const spending = useSelector((state: any) => state.DashboardReducer.max_spending_limit);
    const dispatch = useDispatch();

    const textRef = React.useRef<any>(null);
    const text = React.useRef<any>(null);
    const spaceBottom = useSafeAreaInsets().bottom || 20;

    // Update input with default redux value
    useEffect(() => {
        if (spending) {
            onChangeText(spending)
        }
    }, [spending]);

    // Save input value in redux
    const onSave = () => {
        if (!text.current) {
            Alert.alert("Invalid number");
            return
        }
        dispatch(setMaxSpendingLimit(text.current));
        props.navigation.goBack();
    }

    const onChangeText = (number: string) => {
        if (textRef.current) {
            const num = AppValidator.getOnlyNumbers(number);
            text.current = num
            textRef.current.setNativeProps({
                text: formate_price_without_currency(num)
            });
        }
    }

    const _header = () => {
        return (
            <AppHeader canGoBack={true} title='Spending limit' >
                <View style={{ height: 40 }} />
            </AppHeader>
        )
    }

    const _PriceRange = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                {PRICE_RANGE.map((item, index, self) => {

                    // Provide Space around every item
                    const space = index == 0 ? { marginRight: margin } : self.length - 1 == index ? { marginLeft: margin } : {}
                    return (
                        <TouchableOpacity
                            activeOpacity={.8}
                            key={item.toString()}
                            onPress={() => onChangeText(item)}
                            style={[style.priceTagContainer, space]}
                        >
                            <Text style={style.priceTagStyle}>{formate_price(item)}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    return (
        <KeyboardSpaceProvider>
            <View style={[commonStyles.whiteContainer]}>
                <_header />
                <View style={[commonStyles.scrollTopOverView20radius]}>
                    <View style={[commonStyles.rowCenter, { marginTop: 6 }]}>
                        <ShowImageFromResource
                            source={AppImages.SpendingLimit}
                            size={20}
                        />
                        <Text style={{
                            fontSize: 14,
                            color: AppThemeColors.black,
                            fontFamily: AppFonts.Medium,
                            marginLeft: 12
                        }}>Set a weekly debit card spending limit</Text>
                    </View>
                    <View style={[commonStyles.rowCenter, style.textInputContainer]}>
                        <PriceTag />
                        <TextInput
                            keyboardType='numeric'
                            maxLength={8}
                            style={{
                                flex: 1,
                                marginHorizontal: 10,
                                color: AppThemeColors.black,
                                fontFamily: AppFonts.Bold,
                                fontSize: 20,
                            }}
                            ref={textRef}
                            onChangeText={onChangeText}
                        />
                    </View>
                    <Text style={[style.lightText]}>Here weekly means the last 7 days - not the calendar week</Text>
                    <_PriceRange />
                    <View style={{
                        flex: 1,
                        paddingBottom: 10,
                        marginBottom: spaceBottom
                    }}>
                    </View>
                    <SafeAreaView>
                        <AppButton
                            title='Save'
                            onPress={onSave}
                        />
                    </SafeAreaView>
                </View>
            </View>
        </KeyboardSpaceProvider>
    )
}



const style = StyleSheet.create({
    priceTagContainer: {
        backgroundColor: "rgba(32, 209, 103,0.15)",
        height: 40,
        flex: 1,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: 'center'
    },

    priceTagStyle: {
        fontSize: 13,
        color: AppThemeColors.green,
        fontFamily: AppFonts.Bold
    },

    textInputContainer: {
        paddingBottom: 10,
        marginVertical: 10,
        borderBottomWidth: 1,
        paddingTop: 6,
        borderColor: "#22222220",
    },

    lightText: {
        fontSize: 13,
        color: "#22222266",
        fontFamily: AppFonts.Regular
    }
})
