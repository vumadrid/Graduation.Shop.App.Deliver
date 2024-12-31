import {
  CommonActions,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../utils/colors';
import { ICONS_NAME } from '../../../utils/constant';
import { scale } from '../../../utils/scaling';
import styles from './styles';

function HeaderIcon({ icon, iconColor, iconSize = scale(25) }) {
  return (
    <Ionicons
      name={icon}
      size={iconSize}
      color={iconColor || colors.iconColor}
    />
  );
}

function LeftButton(props) {
  const { icon, outerView, iconColor } = props;
  const navigation = useNavigation();

  switch (icon) {
    case ICONS_NAME.Menu:
      return (
        <View style={[styles.btnContainer, outerView]}>
          <Pressable
            hitSlop={50}
            pressRetentionOffset={50}
            android_ripple={{
              borderless: true,
              color: colors.rippleColor,
              radius: 23,
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={() => navigation.toggleDrawer()}>
            <HeaderIcon iconColor={iconColor} icon={icon} />
          </Pressable>
        </View>
      );
    case ICONS_NAME.Back:
      return (
        <View style={[styles.btnContainer, outerView]}>
          <Pressable
            hitSlop={50}
            pressRetentionOffset={50}
            android_ripple={{
              borderless: true,
              color: colors.rippleColor,
              radius: 23,
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={() => navigation.goBack()}>
            <HeaderIcon iconColor={iconColor} icon={icon} />
          </Pressable>
        </View>
      );
    case ICONS_NAME.Cross:
      return (
        <View style={[styles.btnContainer, outerView]}>
          <Pressable
            hitSlop={50}
            pressRetentionOffset={50}
            android_ripple={{
              borderless: true,
              color: colors.rippleColor,
              radius: 23,
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={() =>
              navigation.dispatch((state) => {
                const routes = state.routes.filter((r) => r.name === 'Menu');
                return CommonActions.reset({
                  ...state,
                  routes,
                  index: 0,
                });
              })
            }>
            <HeaderIcon iconColor={iconColor} icon={icon} />
          </Pressable>
        </View>
      );
    default:
      return null;
  }
}

function RightButton(props) {
  const {
    outerView,
    onPress = () => null,
    icon = null,
    iconColor = colors.iconColor,
    iconSize = scale(20),
  } = props;

  switch (icon) {
    case ICONS_NAME.Pencil:
      return (
        <View style={[styles.btnContainer, outerView]}>
          <Pressable
            hitSlop={50}
            pressRetentionOffset={50}
            android_ripple={{
              borderless: true,
              color: colors.rippleColor,
              radius: 23,
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={onPress}>
            <MaterialCommunityIcons
              name={icon}
              size={iconSize}
              color={iconColor}
            />
          </Pressable>
        </View>
      );
    case ICONS_NAME.Filter:
    case ICONS_NAME.Cross:
    case ICONS_NAME.Add:
      return (
        <View style={[styles.btnContainer, outerView]}>
          <Pressable
            hitSlop={50}
            pressRetentionOffset={50}
            android_ripple={{
              borderless: true,
              color: colors.rippleColor,
              radius: 23,
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            onPress={onPress}>
            <HeaderIcon iconColor={iconColor} icon={icon} iconSize={iconSize} />
          </Pressable>
        </View>
      );
    default:
      return null;
  }
}

HeaderIcon.propTypes = {
  outerView: PropTypes.object,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
};
LeftButton.propTypes = {
  outerView: PropTypes.object,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
};
RightButton.propTypes = {
  outerView: PropTypes.object,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  onPress: PropTypes.func,
};

export { HeaderIcon, LeftButton, RightButton };
