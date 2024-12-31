import { combineReducers } from 'redux';
import authReducer from './authReducer';
import configReducer from './configReducer';

export default combineReducers({
  auth: authReducer,
  conf: configReducer,
});
