import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

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

class WorkStyle extends React.Component<WithStyles<classNames>, {}> {
  public state = {
    name: '',
    workstyle: 1,
  };
  public handleChange = (event:any) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  public render() {
    const { classes } = this.props;
    return (
        <div>
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="workstyle-id">労働形態</InputLabel>
                    <Select
                        value={this.state.workstyle}
                        onChange={this.handleChange}
                        inputProps={{
                            id: 'workstyle-id',
                            name: 'workstyle',
                        }}
                    >
                        <MenuItem value={1}>社員</MenuItem>
                        <MenuItem value={2}>個人事業主</MenuItem>
                        <MenuItem value={3}>法人成り</MenuItem>
                    </Select>
                </FormControl>
            </form>
        </div>
    );
  }
};

export default withStyles(styles)(WorkStyle);
