import { useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Spinner, TextDefault, WrapperView } from '../../components';
import { FlashMessage } from '../../components//FlashMessage/FlashMessage';
import { alignment } from '../../utils/alignment';
import colors from '../../utils/colors';
import styles from './styles';
import { getOrderDetail, updateOrder } from '../../api/Order/Order';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/format';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { NAVIGATION_SCREEN } from '../../utils/constant';
import i18n from '../../configs/i18n';

function OrderDetail() {
  const route = useRoute();
  const order_id = route.params.id;
  const navigation = useNavigation();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [order, setOrder] = useState({});
  const [orderPartner, setOrderPartner] = useState({});
  const [orderAddress, setOrderAddress] = useState({});
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: Object.values(order).length !== 0 ? order.name : '',
    });
  }, [order]);

  useEffect(() => {
    onGetOrderDetail();
  }, [onGetOrderDetail]);

  const onGetOrderDetail = useCallback(() => {
    setLoading(true);
    getOrderDetail({
      access_token: accessToken,
      id: order_id,
    })
      .then((res) => {
        setOrder(res);
        setOrderPartner(res.partner_id);
        setOrderAddress(res.address_id);
        setOrderDetail(res.product_ids);
        setLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
        setLoading(false);
      });
  });

  const onReceiveOrder = () => {
    setLoading(true);
    updateOrder({
      access_token: accessToken,
      id: order_id,
      action: 'receive',
    })
      .then((res) => {
        onGetOrderDetail();
        setLoading(false);
        FlashMessage({
          message: 'Bạn đã nhận giao đơn hàng',
        });
      })
      .catch((err) => {
        console.log('err', err);
        setLoading(false);
      });
  };

  const onRejectOrder = () => {
    setLoading(true);
    updateOrder({
      access_token: accessToken,
      id: order_id,
      action: 'reject',
    })
      .then((res) => {
        onGetOrderDetail();
        setLoading(false);
        FlashMessage({
          message: 'Bạn đã từ chối giao đơn hàng',
        });
      })
      .catch((err) => {
        console.log('err', err);
        setLoading(false);
      });
  };

  const onFinishOrder = () => {
    setLoading(true);
    updateOrder({
      access_token: accessToken,
      id: order_id,
      action: 'finish',
    })
      .then((res) => {
        onGetOrderDetail();
        setLoading(false);
        FlashMessage({
          message: 'Bạn đã hoàn thành đơn hàng',
        });
      })
      .catch((err) => {
        console.log('err', err);
        setLoading(false);
      });
  };

  const onDirectionOrder = () => {
    navigation.navigate(NAVIGATION_SCREEN.MapDirection, {
      latitude: orderAddress.lat,
      longitude: orderAddress.long,
      onFinishOrder: onFinishOrder,
    });
  };

  const getOptionStr = (item) => {
    let toppingStr = '';
    item.topping_ids.map((i) => {
      toppingStr = toppingStr + i.name + ', ';
    });
    return `Size ${item.size_id.name}, ${toppingStr}${item.sugar}% ${i18n.t(
      'sugar',
    )},  ${item.ice}% ${i18n.t('ice')}`;
  };

  function getOrderItems(items) {
    return items.map((item, index) => {
      return (
        <View key={index} style={styles.orderContent}>
          <View style={styles.orderTextLeftContainer}>
            <TextDefault
              textColor={colors.fontMainColor}
              bolder
              style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}>
              {item.product_uom_qty}x
            </TextDefault>
          </View>
          <View style={styles.orderTextCenterContainer}>
            <TextDefault bolder style={{ ...alignment.PTxSmall }}>
              {item.product_name}
            </TextDefault>
            <TextDefault
              style={{ ...alignment.PBxSmall }}
              textColor={colors.placeHolderColor}>
              {getOptionStr(item)}
            </TextDefault>
          </View>
          <View style={styles.orderTextRightContainer}>
            <TextDefault
              numberOfLines={1}
              textColor={colors.placeHolderColor}
              bolder
              style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}>
              {formatCurrency(item.price_subtotal)}
            </TextDefault>
          </View>
        </View>
      );
    });
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <WrapperView>
      <ScrollView style={[styles.flex]} showsVerticalScrollIndicator={false}>
        <View style={styles.customerCard}>
          <View style={styles.customerSubCard}>
            <View style={styles.customerHeader}>
              <TextDefault
                H3
                bolder
                textColor={colors.primary}
                style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}>
                {i18n.t('customerInfo')}
              </TextDefault>
            </View>
            <View style={styles.customerContent}>
              <View style={styles.customerTextContainer}>
                <TextDefault
                  bolder
                  textColor={colors.placeHolderColor}
                  style={{ ...alignment.PTxSmall, paddingBottom: 2 }}>
                  {i18n.t('name')}
                </TextDefault>
                <TextDefault bolder style={{ ...alignment.PBxSmall }}>
                  {orderPartner.name}
                </TextDefault>
              </View>
              <View style={styles.customerTextContainer}>
                <TextDefault
                  bolder
                  textColor={colors.placeHolderColor}
                  style={{ ...alignment.PTxSmall, paddingBottom: 2 }}>
                  {i18n.t('phone')}
                </TextDefault>
                <TextDefault bolder style={{ ...alignment.PBxSmall }}>
                  {orderPartner.phone}
                </TextDefault>
              </View>
              <View style={styles.customerTextContainer}>
                <TextDefault
                  bolder
                  textColor={colors.placeHolderColor}
                  style={{ ...alignment.PTxSmall, paddingBottom: 2 }}>
                  {i18n.t('deliveryAddress')}
                </TextDefault>
                <TextDefault
                  numberOfLines={2}
                  bolder
                  style={{ ...alignment.PBxSmall }}>
                  {`${orderAddress.address_detail}, ${orderAddress.address}`}
                </TextDefault>
              </View>
            </View>
            <View style={[styles.line, { marginBottom: 0 }]} />
            {(order.state === 'waiting' || order.state === 'delivering') && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={[styles.customerBtnStyle]}
                  onPress={() => Linking.openURL(`tel:${orderPartner.phone}`)}>
                  <FontAwesome5
                    name="phone-alt"
                    size={16}
                    color={colors.black}
                  />
                  <TextDefault
                    style={{ marginLeft: 8 }}
                    textColor={colors.fontMainColor}
                    bold>
                    {i18n.t('call')}
                  </TextDefault>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  style={[styles.customerBtnStyle]}
                  onPress={() => {}}>
                  <FontAwesome5 name="comment" size={16} color={colors.black} />
                  <TextDefault
                    style={{ marginLeft: 8 }}
                    textColor={colors.fontMainColor}
                    bold>
                    Nhắn tin
                  </TextDefault>
                </TouchableOpacity> */}
              </View>
            )}
          </View>
        </View>

        <View style={styles.orderContainer}>
          <View style={styles.orderSubContainer}>
            <View style={styles.orderHeader}>
              <TextDefault
                H3
                bolder
                textColor={colors.primary}
                style={{ ...alignment.PTmedium }}>
                {i18n.t('detailOrder')}
              </TextDefault>
            </View>

            {getOrderItems(orderDetail)}

            <View style={styles.line} />
            <View style={styles.orderRow}>
              <TextDefault H4 bolder>
                {i18n.t('totalAmount')}
              </TextDefault>
              <TextDefault
                numberOfLines={1}
                textColor={colors.fontMainColor}
                H4
                bolder>
                {formatCurrency(order.amount_total)}
              </TextDefault>
            </View>
          </View>
        </View>

        {(order.state === 'delivering' || order.state === 'waiting') && (
          <View style={[styles.buttonContainer, { ...alignment.MTmedium }]}>
            <TouchableOpacity
              style={[
                styles.deliveringBtnStyle,
                { backgroundColor: colors.buttonBackground },
              ]}
              onPress={() => onDirectionOrder()}>
              <TextDefault
                textColor={colors.fontMainColor}
                H4
                bold
                style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}>
                {i18n.t('direct')}
              </TextDefault>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.actionContainer}>
          {order.state === 'waiting' && (
            <View style={styles.buttonContainerRow}>
              <TouchableOpacity
                style={[
                  styles.cancelBtnStyle,
                  { backgroundColor: colors.buttonBackground },
                ]}
                onPress={() => onReceiveOrder()}>
                <TextDefault
                  textColor={colors.fontSecondColor}
                  H4
                  bold
                  style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}>
                  {i18n.t('receiveOrder')}
                </TextDefault>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.cancelBtnStyle,
                  { backgroundColor: colors.orange },
                ]}
                onPress={() => onRejectOrder()}>
                <TextDefault
                  textColor={colors.fontSecondColor}
                  H4
                  bold
                  style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}>
                  {i18n.t('reject')}
                </TextDefault>
              </TouchableOpacity>
            </View>
          )}

          {order.state === 'delivering' && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.deliveringBtnStyle,
                  { backgroundColor: colors.orange },
                ]}
                onPress={() => onFinishOrder()}>
                <TextDefault
                  textColor={colors.fontSecondColor}
                  H4
                  bold
                  style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}>
                  {i18n.t('completeOrder')}
                </TextDefault>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </WrapperView>
  );
}

export default OrderDetail;
