import colors from '../../../utils/colors';
import { scale } from '../../../utils/scaling';
import { alignment } from '../../../utils/alignment';

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: '10%',
    borderColor: colors.horizontalLine,
  },
  leftContainer: {
    justifyContent: 'center',
    ...alignment.MRsmall,
  },
  imgContainer: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(15),
    borderStyle: 'dashed',
    borderColor: colors.cartContainer,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    padding: 2,
  },
  rightContainer: {
    justifyContent: 'center',
    ...alignment.MTmedium,
  },
};
