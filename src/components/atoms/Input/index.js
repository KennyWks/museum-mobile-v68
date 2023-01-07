import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text, Platform} from 'react-native';
import {colors} from '../../../utils';

const Input = ({label, value, onChangeText, numKeyboardPad}) => {
  const [border, setBorder] = useState(colors.border.default);

  const onFocusForm = () => {
    setBorder(colors.border.secondary);
  };

  const onBlurForm = () => {
    setBorder(colors.border.default);
  };

  const changeNumKeyboardPad = args => {
    let statusKeyboardPad = '';
    if (args) {
      if (Platform.OS === 'android') {
        statusKeyboardPad = 'numeric';
      } else {
        statusKeyboardPad = 'number-pad';
      }
    } else {
      statusKeyboardPad = 'default';
    }
    return statusKeyboardPad;
  };

  return (
    <View style={styles.cardInput}>
      <Text style={styles.textLabel}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        keyboardType={changeNumKeyboardPad(numKeyboardPad)}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  cardInput: {
    marginTop: 5,
  },
  textLabel: {
    fontSize: 16,
    marginBottom: 6,
    fontFamily: 'Nunito-regular',
    color: colors.text.default,
  },
  input: border => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: border,
    padding: 12,
    color: colors.border.default,
  }),
});
