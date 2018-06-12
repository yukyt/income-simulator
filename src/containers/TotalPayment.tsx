import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { changeTotalPayment } from '../actions/totalPayment';

type classNames = 'container' | 'textField';

const styles: StyleRulesCallback<classNames>  = (theme: Theme) => ({
  container: {
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
  totalPayment: number,
  onChangeTotalPayment: (price: number) => void;
}

class TotalPayment extends React.Component<IProps & WithStyles<classNames>, {}> {
  public handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    this.props.onChangeTotalPayment(parseInt(e.target.value, 10));
  };
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate={true} autoComplete="off">
          <TextField
            id="name"
            label="年間総収入(万円)"
            className={classes.textField}
            value={this.props.totalPayment}
            onChange={this.handleChange}
            margin="normal"
          />
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state:any) => ({
  totalPayment: state.totalPayment,
});

const mapDispatchToProps = (dispatch:any) => ({
  onChangeTotalPayment: (price:number) => {
    dispatch(changeTotalPayment(price));
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TotalPayment));

