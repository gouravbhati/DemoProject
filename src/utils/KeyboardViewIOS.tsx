import React, {useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
} from 'react-native';

// put it inside ScrollView or
export function KeyboardSpaceProvider(props: any) {
  const height = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let willShow: any;
    let willHide: any;
    if (Platform.OS == 'ios') {
      willShow = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
      willHide = Keyboard.addListener('keyboardWillHide', onKeyboardHide);
    }
    return () => {
      if (Platform.OS == 'ios') {
        willShow?.remove();
        willHide?.remove();
      }
    };
  }, []);

  const onKeyboardShow = (event: any) => {
    const keyboardHeight = event.endCoordinates.height || 0;
    height.setValue(keyboardHeight);
  };

  const onKeyboardHide = (event: any) => {
    height.setValue(0);
  };

  return (
    <>
      {props.children}
      <Animated.View style={{height}} />
    </>
  );
}
