import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {connect, useSelector} from 'react-redux';
import {ChangeURLScreen, TabNavigator} from '../pages';
import {colors} from '../utils';

const Stack = createStackNavigator();

function TabNavigatorStackScreen() {
  const languages = useSelector(state => state.languages);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeURLScreen"
        component={ChangeURLScreen}
        options={{
          title: languages.headerChangeURLPage.title,
          headerStyle: {
            backgroundColor: colors.dark,
          },
          headerTintColor: colors.text.default,
        }}
      />
    </Stack.Navigator>
  );
}

export default connect()(TabNavigatorStackScreen);
