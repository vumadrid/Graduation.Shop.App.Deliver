import React, { useCallback, useLayoutEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import i18n from '../../configs/i18n';
import {
  NewOrders,
  HistoryOrders,
  TextDefault,
  WrapperView,
} from '../../components';
import colors from '../../utils/colors';
import useStyle from './styles';
import { getOrders } from '../../api/Order/Order';

export default function Orders() {
  const styles = useStyle();
  const navigation = useNavigation();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [isNewOrderSelected, setIsNewOrderSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newOrders, setNewOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t('Orders'),
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      onGetOrders();
    }, []),
  );

  const onGetOrders = () => {
    setLoading(true);
    getOrders({
      access_token: accessToken,
    })
      .then((res) => {
        setNewOrders(res.new);
        setHistoryOrders(res.history);
        setLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
        setLoading(false);
      });
  };

  return (
    <WrapperView>
      <View style={[styles.flex, styles.bottom]}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsNewOrderSelected(false)}
            style={[
              styles.toggleBtn,
              {
                backgroundColor: !isNewOrderSelected
                  ? colors.buttonBackgroundPink
                  : 'transparent',
              },
            ]}>
            <TextDefault bold H5 numberOfLines={1}>
              {i18n.t('newOrders')}
            </TextDefault>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsNewOrderSelected(true)}
            style={[
              styles.toggleBtn,
              {
                backgroundColor: isNewOrderSelected
                  ? colors.buttonBackgroundPink
                  : 'transparent',
              },
            ]}>
            <TextDefault bold H5 numberOfLines={1}>
              {i18n.t('history')}
            </TextDefault>
          </TouchableOpacity>
        </View>
        {!isNewOrderSelected ? (
          <NewOrders
            data={newOrders}
            loading={loading}
            onRefresh={onGetOrders}
          />
        ) : (
          <HistoryOrders
            data={historyOrders}
            loading={loading}
            onRefresh={onGetOrders}
          />
        )}
      </View>
    </WrapperView>
  );
}
