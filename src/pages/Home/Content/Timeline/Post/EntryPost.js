import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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
      marginLeft: '20px',
    },
    deleteButton: {
      float: 'right'
    }
  });

  const EntryPost = (props) => {
	const {classes} = props;
	return (
    <Paper className={classes.paper}>
      <div className= {classes.root}>
            <Typography  paragraph>
              {props.text}
            </Typography>
            <Typography>
              {/* not sure if this is proper */}
              {props.date.substring(0, 10)} 
            </Typography>
      </div>
      <div className={classes.deleteButton}>
      <Button color="primary" onClick={props.deletePost}>Delete</Button>
      </div>
    </ Paper>
    )
};

export default withStyles(styles)(EntryPost);