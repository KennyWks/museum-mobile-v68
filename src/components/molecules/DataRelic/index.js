import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../utils';

const DataRelic = ({label, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
export default DataRelic;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginLeft: 5,
    marginRight: 5,
  },
  textLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: colors.text.default,
    fontWeight: '700',
  },
  textValue: {fontSize: 14, color: colors.text.default, textAlign: 'justify'},
});
