import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {ILLogo} from '../../assets';
import {colors} from '../../utils';

const Splash = () => {
  return (
    <View style={styles.page}>
      <Image style={styles.logoImg} source={ILLogo} resizeMode="contain" />
      {/* <Text style={styles.title}>Museum</Text> */}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.page.background,
  },
  logoImg: {
    width: '70%',
    height: 130,
  },
  // title: {fontSize: 20, fontWeight: '600', color: colors.dark},
});
