import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    backgroundColor: 'white',
    [theme.breakpoints.down('sm')]: {
      height: '100vh'
    },
    [theme.breakpoints.up('md')]: {
      height: '80vh'
    },
  }
});

class GridContainer extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <Grid container spacing={0}>
        <Grid item xs={false} md={12} style={{height: '10vh'}}></Grid>
        <Grid item xs={false} md={1}></Grid>
        <Grid className={classes.content} item xs={12} md={10}>
          {this.props.children}
        </Grid>
        <Grid item xs={false} md={1}></Grid>
        <Grid item xs={false} md={12} style={{height: '10vh'}}></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(GridContainer); 