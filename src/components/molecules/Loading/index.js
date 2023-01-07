import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {colors} from '../../../utils';

function Loading() {
  const languages = useSelector(state => state.languages);
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={colors.loading.logo} />
      <Text style={styles.loadingText}>{languages.loading}</Text>
    </View>
  );
}

export default connect()(Loading);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.loading.background,
    width: '100%',
    height: '100%',
  },
  loadingText: {
    fontSize: 18,
    color: colors.text.default,
  },
});
