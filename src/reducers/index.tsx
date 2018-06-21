import 'babel-polyfill';
import { combineReducers } from 'redux';
import { payrollDeduction } from './deduction';
import { totalPayment } from './totalPayment';

export default combineReducers({
  totalPayment,
  payrollDeduction,
});
