import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
      maxWidth: 936,
      margin: 'auto',
      overflow: 'hidden',
      marginBottom: '10px',
    },
      root: {
        margin: theme.spacing(1),
        marginTop: '12px',
        width: 750,
        marginLeft: '20px',
    },
  });

  const Post = (props) => {
	const {classes} = props;
	return (
    <Paper className={classes.paper}>
      <div className= {classes.root}>
            <Typography  paragraph>
              {props.text}
            </Typography>
            <Typography paragraph>
              {props.date}
            </Typography>
      </div>
    </ Paper>
    )
};

export default withStyles(styles)(Post);