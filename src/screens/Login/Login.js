import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { FilledTextField } from 'react-native-material-textfield';

import Logo from '../../../assets/images/Svg/Logo';
import i18n from '../../configs/i18n';
import { TextDefault, WrapperView } from '../../components';
import { FlashMessage } from '../../components/FlashMessage/FlashMessage';
import { alignment } from '../../utils/alignment';
import colors from '../../utils/colors';
import { scale, verticalScale } from '../../utils/scaling';
import useStyle from './styles';
import AuthenticationContext from '../../context/Authentication';
import { NAVIGATION_SCREEN } from '../../utils/constant';
import { TextInput } from 'react-native';

export default function Login() {
  const styles = useStyle();
  const navigation = useNavigation();
  const { signIn } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const deviceId = useSelector((state) => state.conf.deviceId);
  const deviceInfo = useSelector((state) => state.conf.deviceInfo);
  const firebaseToken = useSelector((state) => state.conf.firebaseToken);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      title: i18n.t('loginBtn'),
    });
  }, []);

  function validateCredentials() {
    let result = true;
    setEmailError(null);
    setPasswordError(null);

    if (!email) {
      setEmailError('Email không dược để trống');
      result = false;
    } else {
      const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailRegex.test(email) !== true) {
        setEmailError('Email không hợp lệ');
        result = false;
      }
    }
    if (!password) {
      setPasswordError('Mật khẩu không được để trống');
      result = false;
    }
    return result;
  }

  function renderLoginAction() {
    return (
      <TouchableOpacity
        style={styles.loginBtn}
        activeOpacity={0.7}
        onPress={async () => {
          setLoading(true);
          const user = {
            login: email,
            password: password,
            deviceId: deviceId,
            deviceInfo: deviceInfo,
            firebaseToken: firebaseToken,
            role: 'group_user',
          };
          if (validateCredentials()) {
            await signIn(user);
            navigation.navigate(NAVIGATION_SCREEN.Orders);
            setLoading(false);
          }
          setLoading(false);
        }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ flex: 1, justifyContent: 'center' }}
            color={colors.buttonText}
          />
        ) : (
          <TextDefault bold>{i18n.t('loginBtn')}</TextDefault>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <WrapperView>
      <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}>
          <View style={[styles.flex, styles.container]}>
            {/* <Logo width={scale(130)} height={scale(130)} /> */}
            <View style={styles.width100}>
              <TextDefault
                style={alignment.MBmedium}
                textColor={colors.placeHolderColor}>
                {i18n.t('enterEmailPassword')}
              </TextDefault>
              {/* <FilledTextField
                error={emailError}
                keyboardType={'email-address'}
                label={i18n.t('email')}
                labelFontSize={scale(12)}
                fontSize={scale(12)}
                activeLineWidth={0}
                labelHeight={10}
                lineWidth={0}
                textColor={colors.fontMainColor}
                baseColor={colors.fontMainColor}
                errorColor={colors.textErrorColor}
                tintColor={colors.primary}
                labelTextStyle={styles.labelStyle}
                inputContainerStyle={styles.textContainer}
                onChangeText={(text) => {
                  setEmail(text.toLowerCase().trim());
                }}
              />
              <View style={styles.mt15} />
              <FilledTextField
                error={passwordError}
                label={i18n.t('password')}
                secureTextEntry
                labelFontSize={scale(12)}
                fontSize={scale(12)}
                activeLineWidth={0}
                labelHeight={10}
                lineWidth={0}
                textColor={colors.fontMainColor}
                baseColor={colors.fontMainColor}
                errorColor={colors.textErrorColor}
                tintColor={colors.primary}
                labelTextStyle={styles.labelStyle}
                inputContainerStyle={styles.textContainer}
                onChangeText={(text) => {
                  setPassword(text.trim());
                }}
              /> */}
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                cursorColor={colors.fontMainColor}
                selectionColor={colors.fontMainColor}
                style={styles.textContainer}
                onChangeText={(text) => {
                  setEmail(text.trim());
                }}
              />
              <View style={styles.mt15} />
              <TextInput
                placeholder={i18n.t('password')}
                secureTextEntry
                multiline={false}
                cursorColor={colors.fontMainColor}
                selectionColor={colors.fontMainColor}
                style={styles.textContainer}
                onChangeText={(text) => {
                  setPassword(text.trim());
                }}
              />
              <View style={[styles.lower_form]}>{renderLoginAction()}</View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperView>
  );
}
