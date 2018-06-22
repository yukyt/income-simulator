import 'babel-polyfill';
import { combineReducers } from 'redux';
import { blueReturnDeduction, payrollDeduction } from './deduction';
import { totalPayment } from './totalPayment';

export default combineReducers({
  totalPayment,
  payrollDeduction,
  blueReturnDeduction,
});
