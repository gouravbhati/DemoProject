import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { AppFonts } from '../style';

const height = 50; //PixelRatio.getPixelSizeForLayoutSize(17);

interface AppButtonProps {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  onPress: () => void;
  buttonColor?: string;
  textColor?: string;
}

export default function AppButton({
  containerStyle,
  textStyle,
  title,
  onPress,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        style.containerStyle,
        containerStyle,
      ]}>
      <Text style={[style.textStyle, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  containerStyle: {
    height: height,
    borderRadius: 100,
    backgroundColor: '#01D167',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontFamily: AppFonts.DBold
  },
});
