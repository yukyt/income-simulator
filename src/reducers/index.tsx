import 'babel-polyfill';
import { combineReducers } from 'redux';
import { totalPayment } from './totalPayment';

export default combineReducers({
  totalPayment,
});
