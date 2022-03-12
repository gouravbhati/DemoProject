import React from 'react';
import { View, Dimensions, StyleSheet, Text, Image, Touchable, TouchableOpacity, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ShowImageFromResource } from '../../assets/icons';
import AppImages from '../../assets/images';
import { AppFonts } from '../../style';
import { VISACardIcon } from './Resources';
const screen = Dimensions.get('screen');

function createGroups(arr, numGroups) {
  const perGroup = Math.ceil(arr.length / numGroups);
  return new Array(numGroups)
    .fill('')
    .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
}

const getMask = str => {
  return createGroups(
    new Array(16).fill('*').map((item, index) => str[index] || '*'),
    4,
  );
};

function cardHide(card, hide) {
  if (!hide) return card
  let hideNum = [];
  for (let i = 0; i < card.length; i++) {
    if (i < card.length - 4) {
      hideNum.push("*");
    } else {
      hideNum.push(card[i]);
    }
  }
  return hideNum.join("");
}

export default function PaymentView({
  number,
  name,
  expiry_mm,
  expiry_yy,
  cvv
}) {

  const [hide_card, setHideCard] = React.useState(false);

  const card = getMask(cardHide(number.toString(), hide_card));

  return (
    <View>
      <TouchableOpacity
        activeOpacity={.7}
        onPress={() => setHideCard(!hide_card)}
        style={{
          backgroundColor: "#FFF",
          position: 'absolute',
          zIndex: -2,
          right: 0,
          borderRadius: 6,
          top: Platform.OS == 'ios' ? -30 : -35,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          paddingVertical: 8,
        }}>
        <ShowImageFromResource
          size={20}
          source={hide_card ? AppImages.OpenEye : AppImages.CloseEye}
        />
        <Text style={{
          color: "#01D167",
          marginLeft: 5,
          fontFamily: AppFonts.DBold,
        }}>{(hide_card ? "Show" : "Hide") + " card number"}</Text>
      </TouchableOpacity>
      <View style={style.cardStyle}>

        <FastImage source={require('./logo.png')} resizeMode='contain' style={style.chipStyle} />
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              color: '#FFFF',
              letterSpacing: 1.6,
              paddingTop: '8%',
              fontFamily: AppFonts.Bold
            }}>
            {name}
          </Text>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              paddingBottom: '3.5%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: '75%',
                // marginBottom: 5,
              }}>
              <Text style={style.cartTextNumber}>{card[0]}</Text>
              <Text style={style.cartTextNumber}>{card[1]}</Text>
              <Text style={style.cartTextNumber}>{card[2]}</Text>
              <Text style={style.cartTextNumber}>{card[3]}</Text>
            </View>
            <View style={{
              flexDirection: "row",
              marginBottom: Platform.OS == 'android' ? -7 : 0
            }}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: '#FFFF',
                  letterSpacing: 1.6,
                  fontFamily: AppFonts.DBold
                }}>
                {`Thru: ${expiry_mm}/${expiry_yy}`}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: '#FFFF',
                  letterSpacing: 1.6,
                  marginLeft: '8%',
                  fontFamily: AppFonts.DBold
                }}>
                {`CVV: ${hide_card ? "***" : cvv}`}
              </Text>
            </View>

          </View>

        </View>
        <FastImage
          source={VISACardIcon}
          style={{
            height: 21,
            width: 56,
            alignSelf: "flex-end",
          }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  chipStyle: {
    width: '25%',
    height: 27,
    alignSelf: "flex-end",
  },

  cardStyle: {
    width: screen.width - 25,
    borderRadius: 10,
    alignSelf: 'center',
    height: (screen.width * 0.85) / 1.7,
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    backgroundColor: '#01D167',
  },
  cartTextNumber: {
    fontSize: 12,
    color: '#FFFF',
    letterSpacing: 4,
    fontFamily: AppFonts.DBold
  },
});
