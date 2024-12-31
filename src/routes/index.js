import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import Animated from 'react-native-reanimated';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LeftButton } from '../components/Header/HeaderIcons/HeaderIcons';
import Sidebar from '../components/Sidebar/Sidebar';
import { Chat, Login, OrderDetail, Orders } from '../screens';
import colors from '../utils/colors';
import { THEME } from '../theme';
import { ICONS_NAME, NAVIGATION_SCREEN } from '../utils/constant';
import navigationService from './navigationService';
import { screenOptions } from './screenOptions';
import styles from './styles';
import { TextDefault } from '../components';
import Profile from '../screens/Profile/Profile';
import Settings from '../screens/Settings/Settings';
import Notification from '../screens/Notification/Notification';
import MapDirection from '../screens/MapDirection/MapDirection';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Auth() {
  return (
    <Stack.Navigator
      screenOptions={screenOptions({ textColor: colors.fontMainColor })}>
      <Stack.Screen name={NAVIGATION_SCREEN.Login} component={Login} />
    </Stack.Navigator>
  );
}

function Main() {
  const navigation = useNavigation();
  let animatedStyle = {};
  let opacity;
  let OuterWindowSlide, InnerWindowSlide;

  const navigate = (data) => {
    console.log('data: ', data);
    console.log('navigation: ', navigation);
    navigation.push(NAVIGATION_SCREEN.OrderDetail, {
      id: Number.parseInt(data.res_id, 10),
    });
  };

  const subscribe = () => {
    messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      if (!remoteMessage.localNotificationDisplayed) {
        remoteMessage.localNotificationDisplayed = true;

        AsyncStorage.getItem('channel_notification').then((res) => {
          PushNotification.localNotification({
            channelId: res,
            message: remoteMessage.notification.body,
            title: remoteMessage.notification.title,
            bigPictureUrl: remoteMessage.notification.android.imageUrl,
            smallIcon: remoteMessage.notification.android.imageUrl,
            data: {
              remoteMessage: remoteMessage.data,
            },
          });
        });
      }
    });
  };

  const setBackgroundMessage = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (remoteMessage && !remoteMessage.localNotificationDisplayed) {
        remoteMessage.localNotificationDisplayed = true;
        navigate(remoteMessage.data);
      }
    });
  };

  const onNotificationOpenedApp = () => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage && !remoteMessage.localNotificationDisplayed) {
          remoteMessage.localNotificationDisplayed = true;
          navigate(remoteMessage.data);
        }
      });
  };

  const configurePushNotification = () => {
    PushNotification.configure({
      onNotification: function (notification) {
        if (notification.userInteraction && notification.data.remoteMessage) {
          navigate(notification.data.remoteMessage);
        }
      },
    });
  };

  useEffect(() => {
    configurePushNotification();
    setBackgroundMessage();
    onNotificationOpenedApp();
    subscribe();
  }, [setBackgroundMessage, subscribe]);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          flex: 1,
          backgroundColor: colors.primary,
          width: '60%',
          justifyContent: 'space-between',
          borderRightWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        },
        sceneContainerStyle: { backgroundColor: colors.primary },
      }}
      overlayColor="transparent"
      drawerType="slide"
      drawerContent={(props) => {
        const scale = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [1, 0.7],
        });
        const Animatedopacity = Animated.interpolateNode(props.progress, {
          inputRange: [0, 0.6, 1],
          outputRange: [0, 0, 1],
        });
        const AnimatedOuterSlide = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [0, -35],
        });
        const AnimatedInnerSlide = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [0, -15],
        });
        const borderRadius = Animated.interpolateNode(props.progress, {
          inputRange: [0, 1],
          outputRange: [0, 20],
        });
        animatedStyle = { borderRadius, transform: [{ scale }] };
        opacity = Animatedopacity;
        OuterWindowSlide = AnimatedOuterSlide;
        InnerWindowSlide = AnimatedInnerSlide;
        return <Sidebar {...props} />;
      }}>
      <Drawer.Screen name="noDrawer" options={{ headerShown: false }}>
        {(props) => (
          <NoDrawer
            {...props}
            style={animatedStyle}
            opacity={opacity}
            OuterWindowSlide={OuterWindowSlide}
            InnerWindowSlide={InnerWindowSlide}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function NoDrawer({ style, opacity = 1, OuterWindowSlide, InnerWindowSlide }) {
  return (
    <React.Fragment>
      <Animated.View
        style={[styles.outerView, style, { marginLeft: OuterWindowSlide }]}
      />
      <Animated.View
        style={[styles.innerView, style, { marginLeft: InnerWindowSlide }]}
      />
      <Animated.View style={[styles.animatedView, style]}>
        <Stack.Navigator
          initialRouteName={NAVIGATION_SCREEN.Orders}
          screenOptions={screenOptions({
            textColor: colors.primaryBlack,
          })}>
          <Stack.Screen
            name={NAVIGATION_SCREEN.Orders}
            component={Orders}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <Stack.Screen
            name={NAVIGATION_SCREEN.OrderDetail}
            component={OrderDetail}
          />
          <Stack.Screen
            name={NAVIGATION_SCREEN.MapDirection}
            component={MapDirection}
          />
          <Stack.Screen
            name={NAVIGATION_SCREEN.Profile}
            component={Profile}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <Stack.Screen
            name={NAVIGATION_SCREEN.Notification}
            component={Notification}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
          <Stack.Screen name={NAVIGATION_SCREEN.Chat} component={Chat} />
          <Stack.Screen
            name={NAVIGATION_SCREEN.Settings}
            component={Settings}
            options={{
              headerLeft: () => <LeftButton icon={ICONS_NAME.Menu} />,
            }}
          />
        </Stack.Navigator>
      </Animated.View>
      <Animated.View style={[styles.closeView, { opacity: opacity }]}>
        <TextDefault H4 medium>
          {'Close X'}
        </TextDefault>
      </Animated.View>
    </React.Fragment>
  );
}

function AppContainer() {
  const colorScheme = useColorScheme();
  const accessToken = useSelector((state) => state.auth.accessToken);

  console.log('AppContainer Working');

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        theme={colorScheme === 'dark' ? THEME.Dark : THEME.Light}
        ref={(ref) => {
          navigationService.setGlobalRef(ref);
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Main'}>
          {accessToken ? (
            <Stack.Screen name={'Main'} component={Main} />
          ) : (
            <Stack.Screen name={'Auth'} component={Auth} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default AppContainer;
