import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import { scale } from '../../utils/scaling';
import colors from '../../utils/colors';
import styles from './style';
import TextDefault from '../Text/TextDefault/TextDefault';
import { alignment } from '../../utils/alignment';
import { formatCurrency } from '../../utils/format';
import i18n from '../../configs/i18n';

export const orderStatuses = [
  {
    key: 'waiting',
    color: '#febb2c',
  },
  {
    key: 'delivering',
    color: '#28b446',
  },
  {
    key: 'delivered',
    color: '#f14336',
  },
  {
    key: 'done',
    color: '#f14336',
  },
];

function Order(props) {
  const checkStatus = (status) => {
    const obj = orderStatuses.filter((x) => {
      return x.key === status;
    });
    return obj[0];
  };

  const statusColor = checkStatus(props.orderStatus).color;

  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPress}>
      <View style={[styles.card_container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ width: '50%' }}>
            <TextDefault
              numberOfLines={2}
              bold
              textColor={colors.placeHolderColor}>
              {i18n.t('codeOrders')}
            </TextDefault>
            <TextDefault H4 bolder>
              {props.orderCode}
            </TextDefault>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={[
                styles.cardStatusContainer,
                { borderColor: statusColor, borderWidth: 1 },
              ]}>
              <TextDefault
                textColor={statusColor}
                bold
                uppercase
                style={{ ...alignment.PLxSmall, ...alignment.PRxSmall }}>
                {i18n.t(checkStatus(props.orderStatus).key)}
              </TextDefault>
            </View>
            <View style={{ paddingLeft: '5%' }}>
              <AntDesign
                name="arrowright"
                size={scale(20)}
                color={colors.fontMainColor}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}>
          <View>
            <TextDefault
              style={alignment.MTmedium}
              textColor={colors.placeHolderColor}
              bold>
              {i18n.t('totalAmount')}
            </TextDefault>
            <TextDefault
              textColor={colors.placeHolderColor}
              bold
              style={{ ...alignment.MTxSmall }}>
              {i18n.t('timeOrder')}
            </TextDefault>
          </View>
          <View>
            <TextDefault
              style={alignment.MTmedium}
              textColor={colors.fontMainColor}
              bolder>
              {formatCurrency(props.orderAmount)}
            </TextDefault>
            <TextDefault
              textColor={colors.fontMainColor}
              bolder
              style={{ ...alignment.MTxSmall }}>
              {new Date(props.orderDatetime).toLocaleDateString()}{' '}
              {new Date(props.orderDatetime).toLocaleTimeString()}{' '}
            </TextDefault>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

Order.propTypes = {
  orderCode: PropTypes.string.isRequired,
  orderStatus: PropTypes.string.isRequired,
  orderAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  orderDatetime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  onPress: PropTypes.func,
};
export default Order;
