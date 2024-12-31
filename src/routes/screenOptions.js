import { TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import { LeftButton } from '../components';
import { ICONS_NAME } from '../utils/constant';
import { scale } from '../utils/scaling';
import { textStyles } from '../utils/textStyles';

const screenOptions = (props) => ({
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTransparent: true,
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: props && props.textColor,
    ...textStyles.H3,
    ...textStyles.Bold,
    backgroundColor: 'transparent',
  },
  headerTitleContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(80),
  },
  headerLeft: () => <LeftButton icon={ICONS_NAME.Back} />,
  ...TransitionPresets.SlideFromRightIOS,
});

export { screenOptions };
