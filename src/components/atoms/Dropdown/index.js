import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {colors} from '../../../utils';
//redux toolkit
import {connect} from 'react-redux';
import {useSelector} from 'react-redux';

function Dropdown({label, data, onValueChange}) {
  const languages = useSelector(state => state.languages);

  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{label}</Text>
      <RNPickerSelect
        placeholder={{
          label: `${languages.dropDown.placeholder}${label}`,
          value: null,
        }}
        onValueChange={onValueChange}
        items={data}
        style={pickerSelectStyles}
      />
    </View>
  );
}

export default connect()(Dropdown);

const styles = StyleSheet.create({
  textLabel: {color: colors.text.default, fontSize: 16},
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border.default,
    padding: 12,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 4,
    color: colors.text.default,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderRadius: 8,
    color: colors.text.default,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
