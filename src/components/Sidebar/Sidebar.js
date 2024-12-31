import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Animated, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIconsIcon from 'react-native-vector-icons/SimpleLineIcons';

import i18n from '../../configs/i18n';
import { ICONS_NAME, NAVIGATION_SCREEN } from '../../utils/constant';
import Profile from './Profile/Profile';
import styles from './styles';
import AuthenticationContext from '../../context/Authentication';
import { useSelector } from 'react-redux';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import colors from '../../utils/colors';
import navigationService from '../../routes/navigationService';
import { TextDefault } from '../Text';
import { scale } from '../../utils/scaling';
import { alignment } from '../../utils/alignment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions } from '@react-navigation/native';

const MENU = [
  {
    title: 'titleOrders',
    icon: 'bag-outline',
    navigateTo: NAVIGATION_SCREEN.Orders,
  },
  {
    title: 'titleProfile',
    icon: 'user',
    navigateTo: NAVIGATION_SCREEN.Profile,
    isAuth: true,
  },
  {
    title: 'titleNotification',
    icon: 'notifications-outline',
    navigateTo: NAVIGATION_SCREEN.Notification,
    isAuth: true,
  },
  // {
  //   title: 'titleChat',
  //   icon: 'chatbubble-outline',
  //   navigateTo: NAVIGATION_SCREEN.Chat,
  // },
  {
    title: 'titleSettings',
    icon: 'settings-outline',
    navigateTo: NAVIGATION_SCREEN.Settings,
    isAuth: true,
  },
];

function SideBar({ navigation }) {
  const inset = useSafeAreaInsets();
  const { signOut } = useContext(AuthenticationContext);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigationName = navigationService.currentRoute()?.name;

  return (
    <DrawerContentScrollView contentContainerStyle={styles.scrollContent}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          marginBottom: inset.bottom,
        }}>
        <View style={styles.headerContainer}>
          <Profile />
        </View>
        <View style={styles.menuContainer}>
          <View>
            {MENU.map((item, index) => (
              <DrawerItem
                pressColor={'rgba(0,0,0,0.2)'}
                key={`DRAWER_ITEM_LIST_${index}`}
                style={styles.drawerItem}
                activeBackgroundColor={'transparent'}
                activeTintColor={colors.black}
                inactiveTintColor={colors.themeBackground}
                focused={navigationName === item.navigateTo}
                label={(props) => (
                  <TextDefault
                    H5
                    medium
                    textColor={props.color}
                    style={[styles.textView, styles.flex, { paddingTop: 2 }]}>
                    {i18n.t(item.title)}
                  </TextDefault>
                )}
                icon={(props) => {
                  if (item.icon === 'user') {
                    return (
                      <SimpleLineIconsIcon
                        name={item.icon}
                        color={props.color}
                        size={scale(22)}
                      />
                    );
                  } else {
                    return (
                      <IoniconsIcon
                        name={item.icon}
                        size={22}
                        color={props.color}
                      />
                    );
                  }
                }}
                onPress={async () => {
                  if (item.isAuth && !isLogin) {
                    navigation.navigate(NAVIGATION_SCREEN.CreateAccount);
                  } else {
                    navigation.navigate(item.navigateTo);
                  }
                }}
              />
            ))}
          </View>
          <View style={alignment.PBmedium}>
            {isLogin && (
              <DrawerItem
                pressColor={'rgba(0,0,0,0.2)'}
                style={styles.drawerItem}
                label={() => (
                  <TextDefault
                    H5
                    medium
                    textColor={styles.whiteFont.color}
                    style={[styles.textView, styles.flex]}>
                    {i18n.t('titleLogout')}
                  </TextDefault>
                )}
                icon={() => (
                  <IoniconsIcon
                    name={ICONS_NAME.Exit}
                    color={styles.whiteFont.color}
                    size={scale(22)}
                  />
                )}
                onPress={async () => {
                  signOut(accessToken);
                  navigation.dispatch(DrawerActions.closeDrawer());
                }}
              />
            )}
          </View>
        </View>
      </Animated.View>
    </DrawerContentScrollView>
  );
}

SideBar.propTypes = {
  navigation: PropTypes.object,
};
export default SideBar;
