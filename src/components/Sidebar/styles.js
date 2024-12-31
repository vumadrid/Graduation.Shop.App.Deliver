import { alignment } from '../../utils/alignment';
import colors from '../../utils/colors';
import { scale } from '../../utils/scaling';

const styles = {
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  whiteFont: {
    color: colors.themeBackground,
  },
  textView: {
    marginHorizontal: -25,
    ...alignment.PLxSmall,
  },
  headerContainer: {
    height: '25%',
    minHeight: scale(200),
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  menuContainer: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    ...alignment.PTlarge,
  },
  drawerItem: {
    marginVertical: 0,
  },
};

export default styles;
