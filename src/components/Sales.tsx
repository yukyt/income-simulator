import { StyleRulesCallback, Theme, WithStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as React from "react";
import { connect } from "react-redux";
import { changeSales } from "../actions/revenue";

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
  sales: number,
  onChangeSales: (price: number) => void;
}

class Sales extends React.Component<IProps & WithStyles<classNames>, {}> {
  public numberFormat = (price:number) => {
    const formatter = new Intl.NumberFormat('ja-JP');
    return formatter.format(price);
  };
  public handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChangeSales(Number(e.target.value.replace(/,/g, '')));
  };
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate={true} autoComplete="off">
          <TextField
            id="name"
            label="事業収入"
            className={classes.textField}
            value={this.numberFormat(this.props.sales)}
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
  sales: state.sales,
});

const mapDispatchToProps = (dispatch:any) => ({
  onChangeSales: (price:number) => {
    dispatch(changeSales(price));
  },
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Sales));
