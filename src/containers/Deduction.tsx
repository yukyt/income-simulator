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
    return 56730
  }
  // TODO: とりあえず等級は考慮しない
  return Math.floor(pension);
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

class Deduction extends React.Component<IProps & WithStyles<classNames>, {}> {
  public state = {
    name: '',
  };
  public handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChangeExpense(parseInt(e.target.value, 10));
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
              value={this.props.expense}
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
              {this.props.sales - this.props.expense}
              </Typography>
          </Paper>
        </div>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.SELF_EMPLOYEE ? '' : 'none' }}>
          <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">
              給与所得控除
              </Typography>
              <Typography component="p">
              {this.props.payrollDeduction}
              </Typography>
          </Paper>
        </div>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.SELF_EMPLOYEE ? '' : 'none' }}>
          <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">
              給与所得
              </Typography>
              <Typography component="p">
              {this.props.salary - this.props.payrollDeduction}
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
              { getPension(this.props.workStyle, this.props.salary) }
            </Typography>
        </Paper>
        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
            { this.props.workStyle === CONSTANTS.WORK_STYLE.SELF_EMPLOYEE ? '国民健康' : '社会' }
            保険
            </Typography>
            <Typography component="p">
            0
            </Typography>
        </Paper>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.REGULAR_EMPLOYEE ? '' : 'none' }}>
          <Paper className={classes.root} elevation={4}>
              <Typography variant="headline" component="h3">
              青色申告控除
              </Typography>
              <Typography component="p">
              {this.props.blueReturnDeduction}
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Deduction));
