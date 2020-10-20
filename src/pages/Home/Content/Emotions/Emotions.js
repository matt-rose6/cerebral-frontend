import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EmotionSlider from './EmotionSlider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { bdi } from './Survey/Survey'; //can import phq9 as well
import {
  createEmotion,
  getEmotions,
} from '../../../../services/EmotionServices/emotionServices';
import history from '../../../../services/history';

const styles = (theme) => ({
  entryBar: {
    alignItems: 'center',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  },
  title: {
    marginTop: '20px',
  },
});

function Emotions(props) {
  const { classes } = props;

  const [emotionState, setEmotionState] = useState({
    responses: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  const handleSubmit = () => {
    var tempDate = new Date();
    var date =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate() +
      ' ' +
      tempDate.getHours() +
      ':' +
      tempDate.getMinutes() +
      ':' +
      tempDate.getSeconds();
    if (localStorage.getItem('uid')) {
      createEmotion(
        localStorage.getItem('uid'),
        date,
        emotionState.responses
      ).then(() => {
        getEmotions(localStorage.getItem('uid')).then((res) => {
          if (res && res.data.length > 0) {
            res.data.sort(function (a, b) {
              return new Date(b.dates) - new Date(a.dates);
            });
            props.onSetSurveys(res.data);
          }
        });
      });
      history.push('/surveys');
    } else alert('You are not registered to enter a survey');
  };

  const handleChange = (rating, index) => {
    var temp = [...emotionState.responses];
    temp[index] = rating;
    setEmotionState({ responses: temp });
  };

  return (
    <Paper className={classes.paper}>
      <Typography
        align="center"
        paragraph
        variant="h6"
        className={classes.title}
      >
        Beck Depression Inventory
      </Typography>
      {bdi.map((question, index) => {
        return (
          <EmotionSlider
            q1={question[0]}
            q2={question[1]}
            q3={question[2]}
            q4={question[3]}
            key={index}
            index={index}
            handleChange={handleChange}
          />
        );
      })}
      <AppBar
        className={classes.entryBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => history.push('/surveys')}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

Emotions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSurveys: (surveys) =>
      dispatch({ type: actionTypes.SET_SURVEYS, val: surveys }),
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Emotions));
