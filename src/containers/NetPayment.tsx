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
  totalPayment: number,
  payrollDeduction: number,
  blueReturnDeduction: number,
}

class NetPayment extends React.Component<IProps & WithStyles<classNames>, {}> {
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
            年間総所得(万円)
            </Typography>
            <Typography component="p">
            {this.props.totalPayment - this.props.payrollDeduction - this.props.blueReturnDeduction}
            </Typography>
        </Paper>
      </div>
    );
  }
};

const mapStateToProps = (state:any) => ({
  totalPayment: state.totalPayment,
  payrollDeduction: state.payrollDeduction,
  blueReturnDeduction: state.blueReturnDeduction,
});

export default withStyles(styles)(connect(mapStateToProps)(NetPayment));
