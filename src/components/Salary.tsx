import { StyleRulesCallback, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import { connect } from "react-redux";
import { changeSalary } from "../actions/revenue";

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
  salary: number,
  onChangeSalary: (price: number) => void;
}

class Salary extends React.Component<IProps & WithStyles<classNames>, {}> {
  public numberFormat = (price:number) => {
    const formatter = new Intl.NumberFormat('ja-JP');
    return formatter.format(price);
  };
  public handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChangeSalary(Number(e.target.value.replace(/,/g, '')));
  };
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate={true} autoComplete="off">
          <TextField
            id="name"
            label="給与年間総支給額(円)"
            className={classes.textField}
            value={this.numberFormat(this.props.salary)}
            onChange={this.handleChange}
            margin="normal"
            type="number"
          />
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state:any) => ({
  salary: state.salary,
});

const mapDispatchToProps = (dispatch:any) => ({
  onChangeSalary: (price:number) => {
    dispatch(changeSalary(price));
  },
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Salary));
