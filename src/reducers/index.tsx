import 'babel-polyfill';
import { combineReducers } from 'redux';
import { blueReturnDeduction, payrollDeduction } from './deduction';
import { salary, sales } from './revenue';
import { workStyle } from './workStyle';

export default combineReducers({
  workStyle,
  salary,
  sales,
  payrollDeduction,
  blueReturnDeduction,
});
