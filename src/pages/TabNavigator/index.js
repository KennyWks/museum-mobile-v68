import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {IconNavigation, Loading, PopupMenu} from '../../components';
import {colors} from '../../utils';
//redux toolkit
import {connect, useDispatch, useSelector} from 'react-redux';
import ActionType from '../../redux/reducer/globalActionType';

import GetStarted from '../GetStarted';
import RegisterScreen from '../RegisterScreen';
import SaranScreen from '../SaranScreen';

import ScannerStackScreen from '../../router/ScannerStackScreen/index';

const Tab = createBottomTabNavigator();

const TabNavigator = props => {
  const [loading, setLoading] = useState(false);
  const languages = useSelector(state => state.languages);
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.iconMenu}>
        <PopupMenu
          options={[
            {label: 'Indonesian', value: 'indonesian'},
            {label: 'English', value: 'english'},
          ]}
          label={
            <IconNavigation
              name="translate"
              size={25}
              color={colors.text.default}
            />
          }
          onSelect={value => {
            setLoading(true);
            setTimeout(() => {
              dispatch({type: ActionType.CHANGE_LANGUAGE, option: value});
              setLoading(false);
            }, 3000);
          }}
        />
        <PopupMenu
          options={[
            {
              label: languages.popupMenu.label,
              value: languages.popupMenu.label,
            },
          ]}
          label={
            <IconNavigation
              name="dots-vertical"
              size={25}
              color={colors.text.default}
            />
          }
          onSelect={() => {
            props.navigation.replace('ChangeURLScreen');
          }}
        />
      </View>
      <View style={styles.stackScreen}>
        {!loading && (
          <Tab.Navigator
            initialRouteName="HomeStackScreen"
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: colors.dark,
                borderRadius: 20,
                margin: 10,
                height: 60,
                position: 'absolute',
                borderTopWidth: 0,
              },
              tabBarItemStyle: {
                padding: 10,
                borderRadius: 20,
              },
              tabBarLabelStyle: {
                fontSize: 12,
              },
              tabBarActiveBackgroundColor: colors.secondary,
              tabBarActiveTintColor: colors.text.default,
            }}>
            <Tab.Screen
              name="GetStarted"
              component={GetStarted}
              options={{
                title: languages.tabNavigationMenu.home,
                tabBarIcon: () => (
                  <MiIcon
                    name="home-outline"
                    size={23}
                    color={colors.text.default}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="ScannerStackScreen"
              component={ScannerStackScreen}
              options={{
                title: languages.tabNavigationMenu.scanner,
                tabBarIcon: () => (
                  <MiIcon
                    name="qrcode-scan"
                    size={23}
                    color={colors.text.default}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                title: languages.tabNavigationMenu.register,
                tabBarIcon: () => (
                  <MiIcon
                    name={'account-plus-outline'}
                    size={23}
                    color={colors.text.default}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="SaranScreen"
              component={SaranScreen}
              options={{
                title: languages.tabNavigationMenu.recommendations,
                tabBarIcon: () => (
                  <MiIcon
                    name={'chat-alert-outline'}
                    size={23}
                    color={colors.text.default}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </View>
      {loading && <Loading />}
    </>
  );
};

export default connect()(TabNavigator);

const styles = StyleSheet.create({
  iconMenu: {
    width: '100%',
    height: '6%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.dark,
  },
  stackScreen: {
    width: '100%',
    height: '94%',
  },
});
