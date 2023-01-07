import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {colors} from '../../../utils';

export const PopupMenu = ({label, options, onSelect}) => {
  const [opened, setOpened] = useState(false);

  function onOptionSelect(value) {
    onSelect(value);
    setOpened(false);
  }

  function onTriggerPress() {
    setOpened(true);
  }

  function onBackdropPress() {
    setOpened(false);
  }

  return (
    <Menu
      opened={opened}
      onBackdropPress={() => onBackdropPress()}
      onSelect={value => onOptionSelect(value)}>
      <MenuTrigger onPress={() => onTriggerPress()}>{label}</MenuTrigger>
      <MenuOptions style={styles.menuOptions}>
        {options.map(data => (
          <MenuOption
            style={styles.menuOption}
            value={data.value}
            key={data.value}>
            <Text style={styles.textLabel}>{data.label}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default PopupMenu;

const styles = StyleSheet.create({
  menuOptions: {
    backgroundColor: colors.dark,
  },
  menuOption: {
    backgroundColor: colors.secondary,
    padding: 13,
    borderWidth: 0,
    borderColor: colors.secondary,
  },
  textLabel: {color: colors.text.default},
});
