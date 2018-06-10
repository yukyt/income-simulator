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

class Deduction extends React.Component<WithStyles<classNames>, {}> {
  public state = {
    name: '',
    workstyle: 1,
  };
  public handleChange = (event:any) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  public render() {
    return (
        <div>
            TODO: 経費<br />
            TODO: 給与所得控除<br />
            TODO: 年金<br />
            TODO: 保険料<br />
        </div>
    );
  }
};

export default withStyles(styles)(Deduction);
