import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>{title}</Text>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {width: '100%', alignItems: 'center', margin: 5},
  textHeader: {color: colors.text.default, fontSize: 20, fontWeight: '800'},
});
