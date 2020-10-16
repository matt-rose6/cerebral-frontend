import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
//import { analyzeSentiment } from '../../../../../services/LanguageServices/languageServices';

const styles = (theme) => ({
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
    float: 'right',
    marginRight: '10px',
  },
});

const PatternPost = (props) => {
  const { classes } = props;

  // const [sentimentState, setSentiment] = useState({
  //   sentiment: '',
  //   magnitude: '',
  // });

  // useEffect(() => {
  //   if (props.text) {
  //     analyzeSentiment(props.text).then((res) => {
  //       if (res && res.data)
  //         setSentiment({
  //           sentiment: res.data.score,
  //           magnitude: res.data.magnitude,
  //         });
  //     });
  //   }
  // }, [props.text]);

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <Typography>
          Emotional Experience:{' '}
          {props.sentiment === '' ? 'Loading...' : props.sentiment.toFixed(2)}
        </Typography>
        <Typography paragraph>
          Strength of Emotion:{' '}
          {props.magnitude === '' ? 'Loading...' : props.magnitude.toFixed(2)}
        </Typography>
        <Typography paragraph className={classes.deleteButton}>
          {/* not sure if this is proper */}
          {props.date}
        </Typography>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(PatternPost);
