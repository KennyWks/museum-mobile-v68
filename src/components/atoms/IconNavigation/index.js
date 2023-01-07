import React from 'react';
import MiIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function IconNavigation({name, size, color, onPress}) {
  return <MiIcon name={name} size={size} color={color} />;
}
