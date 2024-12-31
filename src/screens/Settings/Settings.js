import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, TouchableOpacity, View, StyleSheet } from 'react-native';
import CodePush from 'react-native-code-push';
import { Modalize } from 'react-native-modalize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import i18n from '../../configs/i18n';
import { Spinner, TextDefault, WrapperView } from '../../components';
import { alignment } from '../../utils/alignment';
import { ICONS_NAME } from '../../utils/constant';
import { scale } from '../../utils/scaling';
import SettingModal from './components/SettingModal';
import useStyle from './styles';

const languageTypes = [
  { value: 'Tiếng Việt', code: 'vn', index: 0 },
  { value: 'English', code: 'en', index: 1 },
];

function Settings() {
  const styles = useStyle();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const modalizeRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [languageName, languageNameSetter] = useState('Tiếng Việt');
  const [activeRadio, activeRadioSetter] = useState(languageTypes[0].index);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t('titleSettings'),
      headerRight: null,
    });
    selectLanguage();
  }, [navigation]);

  async function selectLanguage() {
    const lang = await AsyncStorage.getItem('language');
    if (lang) {
      const defLang = languageTypes.findIndex((el) => el.code === lang);
      const langName = languageTypes[defLang].value;
      activeRadioSetter(defLang);
      languageNameSetter(langName);
    }
  }

  const onSelectedLanguage = async (active) => {
    const languageInd = active;
    if (Platform.OS === 'android') {
      await AsyncStorage.setItem('language', languageTypes[languageInd].code);
      CodePush.restartApp();
    }
  };

  const onClose = () => {
    modalizeRef.current.close();
  };

  return (
    <WrapperView>
      {loading && (
        <View style={{ ...StyleSheet.absoluteFill }}>
          <Spinner />
        </View>
      )}
      <View style={[styles.flex, styles.mainContainer]}>
        <View style={alignment.Plarge}>
          <View style={[styles.languageContainer, styles.shadow]}>
            <View style={styles.changeLanguage}>
              <View style={styles.headingLanguage}>
                <TextDefault
                  numberOfLines={1}
                  textColor={colors.statusSecondColor}
                  medium>
                  {i18n.t('language')}
                </TextDefault>
                <TextDefault textColor={colors.statusSecondColor} medium>
                  ({languageName})
                </TextDefault>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => modalizeRef.current.open('top')}
                style={styles.button}>
                <MaterialCommunityIcons
                  name={ICONS_NAME.Pencil}
                  size={scale(14)}
                  color={colors.fontMainColor}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.versionContainer}>
            <TextDefault textColor={colors.fontSecondColor}>
              {i18n.t('version')}: 1.0.0
            </TextDefault>
          </View>
        </View>
      </View>

      {/* Modal for language Changes */}
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handlePosition="inside"
        avoidKeyboardLikeIOS={Platform.select({
          ios: true,
          android: false,
        })}
        keyboardAvoidingOffset={2}
        keyboardAvoidingBehavior="height">
        <SettingModal
          onClose={onClose}
          onSelectedLanguage={onSelectedLanguage}
          activeRadio={activeRadio}
        />
      </Modalize>
    </WrapperView>
  );
}
export default Settings;
