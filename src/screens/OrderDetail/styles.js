import { Dimensions, StyleSheet } from 'react-native';
import { alignment } from '../../utils/alignment';
import colors from '../../utils/colors';
import { scale, verticalScale } from '../../utils/scaling';
const { height } = Dimensions.get('window');

export default {
  flex: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  line: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.horizontalLine,
    ...alignment.MTmedium,
    ...alignment.MBmedium,
  },

  customerCard: {
    marginHorizontal: 16,
    ...alignment.MTmedium,
  },
  customerSubCard: {
    ...alignment.PTmedium,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: '#F3FAFE',
    borderRadius: scale(10),
    borderColor: colors.horizontalLine,
  },
  customerHeader: {
    alignItems: 'center',
    ...alignment.MBsmall,
  },
  customerContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  customerContentRow: {
    flexDirection: 'row',
  },
  customerTextContainer: {
    justifyContent: 'center',
  },

  orderContainer: {
    paddingHorizontal: 16,
    ...alignment.PTmedium,
    ...alignment.PBxSmall,
  },
  orderSubContainer: {
    ...alignment.PTxSmall,
    ...alignment.PBmedium,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: scale(16),
    backgroundColor: '#F3FAFE',
    borderColor: colors.horizontalLine,
  },
  orderHeader: {
    alignItems: 'center',
    ...alignment.MBsmall,
  },
  orderContent: {
    flexDirection: 'row',
  },
  orderTextLeftContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  orderTextCenterContainer: {
    width: '65%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  orderTextRightContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionContainer: {
    // ...alignment.MTsmall,
    // ...alignment.MBsmall,
  },
  actionSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: scale(10),
    ...alignment.MBlarge,
  },
  cancelBtnStyle: {
    height: 44,
    width: '47%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
  },
  deliveringBtnStyle: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    ...alignment.MBmedium,
  },
  customerBtnStyle: {
    height: 44,
    width: '47%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
  },
  buttonContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  buttonContainer: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  mapContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    height: verticalScale(200),
  },
};
