import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../utils';

const Button = ({type, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.title(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'dark'
        ? colors.button.primary.background
        : colors.button.secondary.background,
    paddingVertical: 10,
    borderRadius: 10,
  }),
  title: type => ({
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color:
      type === 'dark'
        ? colors.button.primary.text
        : colors.button.secondary.text,
  }),
});
