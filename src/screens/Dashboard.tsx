import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { PriceTag, ShowImageFromResource, ToggleButton } from '../assets/icons';
import { AppHeader } from '../utils/AppHeader';
import { AppFonts, AppThemeColors, commonStyles, SCREEN } from '../style';
import { DASHBOARD_TABS } from '../constants/data';
import { useDispatch, useSelector } from 'react-redux';
import PaymentView from '../utils/CardInput/PaymentView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formate_price, formate_price_without_currency } from '../constants/PriceFormater';
import { fetchDashboardApi, setToggles } from '../store/actions/DashboardAction';
import ErrorView from '../utils/ErrorView';
import ProgressBar from '../utils/ProgressBar';
import { calculatePercentage } from '../constants/Math';


export default function Dashboard(props: any) {

    const dispatch = useDispatch();
    const reducer = useSelector((state: any) => state.DashboardReducer);

    // Mount for Api calling
    useEffect(() => {
        callApi();
    }, []);

    const callApi = () => {
        dispatch(fetchDashboardApi())
    }


    const _header = () => {
        return (
            <AppHeader
                title='Debit Card'
            >
                <Text style={[style.textStyleWhite, { marginTop: 16 }]}>Available balance</Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 12,
                    alignItems: "center"
                }}>

                    <PriceTag />
                    <View style={{}}>
                        <Text style={[style.headingStyle, { marginLeft: 5 }]}>{formate_price_without_currency(reducer?.data?.balance)}</Text>
                    </View>
                </View>
                <View style={{
                    height: 160
                }} />
            </AppHeader>
        )
    }

    const _spendingProgress = () => {
        if (!reducer?.active_options?.spending) return null;
        const limit = reducer?.data?.debit_limit || 0;
        const max_limit = reducer?.max_spending_limit || 1000;
        return (
            <View style={{ marginTop: 15 }}>
                <View style={[commonStyles.rowCenter, { justifyContent: 'space-between' }]}>
                    <Text style={[style.textStyleWhite, { color: AppThemeColors.black }]}>Debit card spending limit</Text>

                    <View style={commonStyles.rowCenter}>
                        <Text style={[style.textStyleWhite, { color: AppThemeColors.green, fontFamily: AppFonts.DBold }]}>{formate_price(limit)}</Text>
                        <View style={{
                            height: 13,
                            width: 2,
                            backgroundColor: AppThemeColors.lightWhite,
                            marginHorizontal: 5
                        }} />
                        <Text
                            style={
                                [
                                    style.textStyleWhite,
                                    {
                                        color: AppThemeColors.lightWhite,
                                        fontFamily: AppFonts.DBold
                                    }
                                ]
                            }>
                            {formate_price(max_limit)}
                        </Text>
                    </View>
                </View>
                <ProgressBar
                    progress={calculatePercentage(limit, max_limit)}
                />
            </View>
        )
    }

    const _renderOptions = () => {
        return (
            <>
                {
                    DASHBOARD_TABS.map((item) => (
                        <TouchableOpacity
                            activeOpacity={.85}
                            onPress={() => {
                                if (item.screen) {
                                    props.navigation.navigate(item.screen)
                                }
                            }}
                            key={item.title}
                            style={[commonStyles.rowCenter, {
                                height: 41,
                                marginBottom: 18
                            }]}
                        >
                            <ShowImageFromResource size={35} source={item.icon} />
                            <View style={{ marginLeft: 10, flex: 1 }}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 15,
                                        color: AppThemeColors.darkBlue,
                                        lineHeight: 27,
                                        fontFamily: AppFonts.Medium
                                    }}>{item.title}</Text>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 13,
                                        color: AppThemeColors.black,
                                        opacity: .4,
                                        fontFamily: AppFonts.Regular
                                    }}>{item.description}</Text>
                            </View>
                            {item.toggle && (
                                <ToggleButton
                                    show={reducer?.active_options?.[item.key]}
                                    onChange={(value) => {
                                        const obj = { [item.key]: value }
                                        dispatch(setToggles(obj))
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                    ))
                }

            </>
        )
    }


    // Render when we have api data

    return (

        <View style={commonStyles.whiteContainer}>
            {
                // Error or Loading View
                reducer.loading || reducer.error_message || !reducer.data
                    ?
                    <View style={commonStyles.centerItem}>
                        {reducer.loading && (
                            <ActivityIndicator
                                size='large'
                                color={AppThemeColors.blueGreen}
                            />
                        )}
                        {reducer.error_message && reducer.loading == false && (
                            <ErrorView
                                error={reducer.error_message}
                                onRefresh={callApi}
                            />
                        )}
                    </View>
                    :
                    <>
                        <View style={[StyleSheet.absoluteFill]}>
                            <_header />
                        </View>
                        <ScrollView contentContainerStyle={{
                            paddingTop: 245 + useSafeAreaInsets().top
                        }}>
                            <View style={[commonStyles.scrollTopOverView20radius]}>
                                <View style={{
                                    marginTop: '-20%'
                                }}>
                                    <PaymentView {...reducer?.data?.card} />
                                </View>
                                <_spendingProgress />
                                <View style={{ height: 30 }} />
                                <_renderOptions />
                            </View>
                        </ScrollView>
                    </>
            }
        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppThemeColors.white
    },

    headingStyle: {
        color: AppThemeColors.white,
        fontSize: 22,
        fontFamily: AppFonts.Bold,
    },

    textStyleWhite: {
        fontSize: 14,
        color: AppThemeColors.white,
        fontFamily: AppFonts.Medium
    }
})