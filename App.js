import { View, Text, StatusBar, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppNavigation from './src/navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { commonStyles } from './src/style';
import AppImages from './src/assets/images';
import FastImage from 'react-native-fast-image';

export default function App() {

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 3000);
  }, [])

  const _splashView = () => {
    return (
      <View style={[StyleSheet.absoluteFill, commonStyles.centerItem]}>
        <FastImage
          resizeMode='contain'
          style={{
            width: '40%',
            height: "40%"
          }}
          source={AppImages.LogoWithTitle}
        />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <AppNavigation />
      <StatusBar
        translucent={true}
        barStyle='light-content'
      />
      {splash && (
        <_splashView />
      )}
    </SafeAreaProvider>
  )
}