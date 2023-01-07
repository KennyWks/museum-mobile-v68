import React from 'react';
import {StyleSheet, View} from 'react-native';

const Gap = ({height}) => {
  return <View style={styles.view(height)} />;
};

export default Gap;

const styles = StyleSheet.create({
  view: height => ({
    paddingVertical: height,
  }),
});
