import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

type classNames = 'root' | 'textField';

const styles: StyleRulesCallback<classNames>  = (theme: Theme) => ({
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

class Deduction extends React.Component<WithStyles<classNames>, {}> {
  public state = {
    name: '',
  };
  public handleChange = (name:string) => (event:any) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <TextField
          id="name"
          label="年間経費(万円)"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
            給与所得控除
            </Typography>
            <Typography component="p">
            0
            </Typography>
        </Paper>
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
        <Paper className={classes.root} elevation={4}>
            <Typography variant="headline" component="h3">
            青色申告控除
            </Typography>
            <Typography component="p">
            0
            </Typography>
        </Paper>
      </div>
    );
  }
};

export default withStyles(styles)(Deduction);
