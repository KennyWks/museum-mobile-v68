import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ScannerScreen, ShowDataScreen} from '../../pages';

const Stack = createStackNavigator();

function ScannerStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScannerScreen"
        component={ScannerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShowDataScreen"
        component={ShowDataScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default ScannerStackScreen;
