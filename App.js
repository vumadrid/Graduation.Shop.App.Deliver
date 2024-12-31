import React, { useEffect, useState } from 'react';
import { StatusBar, BackHandler, View, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { enableLatestRenderer } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import i18n from './src/configs/i18n';
import { AuthenticationProvider } from './src/context/Authentication';
import { hasLocationPermission } from './src/services/Location';
import { GOOGLE_API_KEY } from './src/configs/environment';
import { AnimatedSplash } from './src/screens';
import { exitAlert } from './src/utils/androidBackButton';
import store from './src/redux/store';
import AppContainer from './src/routes/index';
import { createChannel } from './src/services/Notification';

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadData();
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', exitAlert);
    };
  }, []);

  async function loadData() {
    await i18n.initAsync();
    await hasLocationPermission();

    createChannel();
    enableLatestRenderer();
    Geocoder.init(GOOGLE_API_KEY);

    BackHandler.addEventListener('hardwareBackPress', exitAlert);
    setIsLoaded(true);
  }

  if (isLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />

        <Provider store={store}>
          <AuthenticationProvider>
            <AppContainer />
          </AuthenticationProvider>
        </Provider>
        <FlashMessage duration={2000} position="center" />
      </View>
    );
  }
}
