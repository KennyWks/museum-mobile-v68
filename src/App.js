import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import FlashMessage from 'react-native-flash-message';
import {MenuProvider} from 'react-native-popup-menu';
import {Splash} from './pages';
import TabNavigatorStackScreen from './router/index';
//redux toolkit
import {Provider} from 'react-redux';
import {store} from './utils/store/index';

export default function App() {
  const [view, setView] = useState(<Splash />);

  useEffect(() => {
    setTimeout(() => {
      setView(<TabNavigatorStackScreen />);
    }, 3000);
  }, []);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <MenuProvider>{view}</MenuProvider>
        </NavigationContainer>
        <FlashMessage position="top" />
      </Provider>
    </>
  );
}
