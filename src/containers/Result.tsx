import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';
import { changeExpense } from '../actions/deduction';
import * as CONSTANTS from '../define';

type classNames = 'container' | 'root' | 'textField';

const styles: StyleRulesCallback<classNames>  = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

// 年金計算
const getPension = (workStyle: number, salary: number): number => {
  if (workStyle === CONSTANTS.WORK_STYLE.SELF_EMPLOYEE) {
    // 国民年金
    // TODO: とりあえず２年前納の割引前提
    return 188675;
  }
  // 厚生年金(自己負担分)
  const pension = salary * 0.0915;
  if (pension < 8052 * 12) {
    return 8052 * 12;
  }
  if (pension > 56730 * 12) {
    return 56730 * 12
  }
  // TODO: とりあえず等級は考慮しない
  return Math.floor(pension);
}

const getInsuranceFee = (workStyle: number, salary: number, sales: number, expense: number): number => {
  if (workStyle === CONSTANTS.WORK_STYLE.SELF_EMPLOYEE) {
    // 医療分保険料
    let medicalInsuranceFee = ((sales - expense) * 0.0692) + 31880;
    if (medicalInsuranceFee > 540000) {
      medicalInsuranceFee = 540000;
    }
    // 後期高齢者支援金等分保険料
    let elderInsuranceFee = ((sales - expense) * 0.024) + 11072;
    if (elderInsuranceFee > 190000) {
      elderInsuranceFee = 190000;
    }
    // TODO 介護納付金分保険料は一旦除外
    return Math.floor(medicalInsuranceFee + medicalInsuranceFee);
  }

  // 社会保険(厚生年金を除く)
  // 健康保険料
  // とりあえず東京固定
  let healthInsuranceFee = salary * 0.0445;
  if (healthInsuranceFee > 825660) {
    healthInsuranceFee = 825660;
  }
  // TODO 介護保険料は一旦除外
  // 雇用保険料
  const employeeEnsuranceFee = salary * 0.003;
  // 労災保険料 会社負担のみなので除く
  return Math.floor(healthInsuranceFee + employeeEnsuranceFee);
}


// 最終的な所得
const getIncome = (workStyle: number, salary:number, sales:number, payrollDeduction:number, blueReturnDeduction:number, expense:number): number => {
  let salaryIncome = (salary - payrollDeduction);
  if (salaryIncome < 0) {
    salaryIncome = 0;
  }
  let salesIncome = (sales - blueReturnDeduction - expense) || 0;
  if (salesIncome < 0) {
    salesIncome = 0;
  }
  // ここはマイナスになってもok
  return salaryIncome + salesIncome - getPension(workStyle, salary) - getInsuranceFee(workStyle, salary, sales, expense);
}


interface IProps {
  salary: number,
  sales: number,
  expense: number,
  workStyle: number,
  payrollDeduction: number,
  blueReturnDeduction: number,
  pention: number,
  onChangeExpense: (price: number) => void,
}

class Result extends React.Component<IProps & WithStyles<classNames>, {}> {
  public numberFormat = (price:number) => {
    const formatter = new Intl.NumberFormat('ja-JP');
    return formatter.format(price);
  };
  public handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChangeExpense(Number(e.target.value.replace(/[^0-9]/g, '')));
  };
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.REGULAR_EMPLOYEE ? '' : 'none' }}>
          <form className={classes.container} noValidate={true} autoComplete="off">
            <TextField
              id="name"
              label="年間経費"
              className={classes.textField}
              value={this.numberFormat(this.props.expense)}
              onChange={this.handleChange}
              margin="normal"
            />
          </form>
        </div>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.REGULAR_EMPLOYEE ? '' : 'none' }}>
          <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">
              事業所得
              </Typography>
              <Typography component="p">
              {this.numberFormat(this.props.sales - this.props.expense)}
              </Typography>
          </Paper>
        </div>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.SELF_EMPLOYEE ? '' : 'none' }}>
          <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">
              給与所得控除
              </Typography>
              <Typography component="p">
              {this.numberFormat(this.props.payrollDeduction)}
              </Typography>
          </Paper>
        </div>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.SELF_EMPLOYEE ? '' : 'none' }}>
          <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">
              給与所得
              </Typography>
              <Typography component="p">
              {this.numberFormat(this.props.salary - this.props.payrollDeduction)}
              </Typography>
          </Paper>
        </div>

        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.REGULAR_EMPLOYEE ? '' : 'none' }}>
          <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">
              個人事業税
              </Typography>
              <Typography component="p">
              0（とりあえず）
              </Typography>
          </Paper>
        </div>
        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
              { this.props.workStyle === CONSTANTS.WORK_STYLE.SELF_EMPLOYEE ? '国民' : '厚生' }
              年金
            </Typography>
            <Typography component="p">
              { this.numberFormat(getPension(this.props.workStyle, this.props.salary)) }
            </Typography>
        </Paper>
        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
            { this.props.workStyle === CONSTANTS.WORK_STYLE.SELF_EMPLOYEE ? '国民健康' : '社会' }
            保険
            </Typography>
            <Typography component="p">
            { this.numberFormat(getInsuranceFee(this.props.workStyle, this.props.salary, this.props.sales, this.props.expense)) }
            </Typography>
        </Paper>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.REGULAR_EMPLOYEE ? '' : 'none' }}>
          <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">
              青色申告控除
              </Typography>
              <Typography component="p">
              {this.numberFormat(this.props.blueReturnDeduction)}
              </Typography>
          </Paper>
        </div>
        <div>
          <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">
              年間総所得
              </Typography>
              <Typography component="p">
              {this.numberFormat(getIncome(
                this.props.workStyle,
                this.props.salary,
                this.props.sales,
                this.props.payrollDeduction,
                this.props.blueReturnDeduction,
                this.props.expense
              ))}
              </Typography>
          </Paper>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state:any) => ({
  salary: state.salary,
  sales: state.sales,
  expense: state.expense,
  workStyle: state.workStyle,
  payrollDeduction: state.payrollDeduction,
  blueReturnDeduction: state.blueReturnDeduction,
  pention: state.pention,
});

const mapDispatchToProps = (dispatch:any) => ({
  onChangeExpense: (price:number) => {
    dispatch(changeExpense(price));
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Result));
