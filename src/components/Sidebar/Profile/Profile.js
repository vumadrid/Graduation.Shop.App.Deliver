import React from 'react';
import { View } from 'react-native';
import Spinner from '../../Spinner/Spinner';
import styles from './styles';
import TextDefault from '../../Text/TextDefault/TextDefault';
import colors from '../../../utils/colors';
import TextError from '../../Text/TextError/TextError';
import i18n from '../../../configs/i18n';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

function Profile() {
  const navigation = useNavigation();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const user = useSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {isLogin && user && (
          <View style={styles.imgContainer}>
            <TextDefault textColor={colors.themeBackground} bold H1>
              {user.user_id.name.substr(0, 1).toUpperCase()}
            </TextDefault>
          </View>
        )}
      </View>
      <View style={styles.rightContainer}>
        <TextDefault H5 bold textColor={colors.fontSecondColor}>
          {i18n.t('welcome')}
        </TextDefault>
        {isLogin && user && (
          <TextDefault H3 textColor={colors.fontSecondColor} bolder>
            {user.user_id.name}
          </TextDefault>
        )}
      </View>
    </View>
  );
}

export default Profile;
