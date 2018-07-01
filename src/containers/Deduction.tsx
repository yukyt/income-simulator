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

interface IProps {
  salary: number,
  sales: number,
  expense: number,
  workStyle: number,
  payrollDeduction: number,
  blueReturnDeduction: number,
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

        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
            年金
            </Typography>
            <Typography component="p">
            0
            </Typography>
        </Paper>
        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
            保険料
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
});

const mapDispatchToProps = (dispatch:any) => ({
  onChangeExpense: (price:number) => {
    dispatch(changeExpense(price));
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Deduction));
