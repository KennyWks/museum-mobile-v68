import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../../utils';
//redux toolkit
import {connect} from 'react-redux';
import {useSelector} from 'react-redux';

const DropdownWithSearch = ({label, data, onValueChange}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const languages = useSelector(state => state.languages);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[styles.textLabel, isFocus && {color: colors.text.default}]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: colors.border.default},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedText={styles.selectedText}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{backgroundColor: colors.dark}}
        activeColor={colors.secondary}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? languages.dropDown.placeholder + label : '...'}
        searchPlaceholder={languages.dropDown.searchPlaceholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          onValueChange(item.label, item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default connect()(DropdownWithSearch);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
  },
  dropdown: {
    height: 70,
    borderColor: colors.border.default,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  textLabel: {
    position: 'absolute',
    backgroundColor: colors.dark,
    left: 2,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    color: colors.text.default,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: colors.dark,
  },
});
