import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import * as CONSTANTS from 'src/define';
import { changeExpense } from '../actions/deduction';
import { changeSalary, changeSales } from '../actions/revenue';
import { changeWorkStyle } from '../actions/workStyle';

type classNames = 'root' | 'formControl';

const styles: StyleRulesCallback<classNames>  = (theme: Theme) => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
});

interface IProps {
  workStyle: number,
  onChangeWorkStyle: (workStyle: number) => void;
}

class WorkStyle extends React.Component<IProps & WithStyles<classNames>, {}> {
  public handleChange = (e:React.ChangeEvent<HTMLSelectElement>)  => {
    this.props.onChangeWorkStyle(parseInt(e.target.value, 10));
  };
  public render() {
    const { classes } = this.props;
    return (
        <div>
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="workstyle-id">労働形態</InputLabel>
                    <Select
                        value={this.props.workStyle}
                        onChange={this.handleChange}
                        inputProps={{
                            id: 'workstyle-id',
                            name: 'workstyle',
                        }}
                    >
                        {Object.keys(CONSTANTS.WORK_STYLE).map((key, i) => (
                        <MenuItem key={i} value={CONSTANTS.WORK_STYLE[key]}>{CONSTANTS.WORK_STYLE_NAME.get(CONSTANTS.WORK_STYLE[key])}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </form>
        </div>
    );
  }
};


const mapStateToProps = (state:any) => ({
  workStyle: state.workStyle,
});

const mapDispatchToProps = (dispatch:any) => ({
  onChangeWorkStyle: (workStyle:number) => {
    dispatch(changeWorkStyle(workStyle));
    if (workStyle === CONSTANTS.WORK_STYLE.REGULAR_EMPLOYEE) {
        dispatch(changeSales(0));
        dispatch(changeExpense(0));
    }
    if (workStyle === CONSTANTS.WORK_STYLE.SELF_EMPLOYEE) {
        dispatch(changeSalary(0));
    }
  },
});
    
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(WorkStyle));
  
