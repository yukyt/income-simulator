import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { connect } from 'react-redux';

type classNames = 'root';

const styles: StyleRulesCallback<classNames>  = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

interface IProps {
  salary: number,
  sales: number,
  payrollDeduction: number,
  blueReturnDeduction: number,
}

class NetPayment extends React.Component<IProps & WithStyles<classNames>, {}> {
  public calc (salary:number, sales:number, payrollDeduction:number, blueReturnDeduction:number) {
    console.log('calc');
    let salaryIncome = (salary - payrollDeduction);
    if (salaryIncome < 0) {
      salaryIncome = 0;
    }
    let salesIncome = (sales - blueReturnDeduction) || 0;
    if (salesIncome < 0) {
      salesIncome = 0;
    }
    return salaryIncome + salesIncome;
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
            年間総所得(万円)
            </Typography>
            <Typography component="p">
            {this.calc(this.props.salary, this.props.sales, this.props.payrollDeduction, this.props.blueReturnDeduction)}
            </Typography>
        </Paper>
      </div>
    );
  }
};

const mapStateToProps = (state:any) => ({
  salary: state.salary,
  sales: state.sales,
  payrollDeduction: state.payrollDeduction,
  blueReturnDeduction: state.blueReturnDeduction,
});

export default withStyles(styles)(connect(mapStateToProps)(NetPayment));
