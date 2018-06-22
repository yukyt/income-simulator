import 'babel-polyfill';
import { combineReducers } from 'redux';
import { blueReturnDeduction, payrollDeduction } from './deduction';
import { salary, sales } from './revenue';

export default combineReducers({
  salary,
  sales,
  payrollDeduction,
  blueReturnDeduction,
});
