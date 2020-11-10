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
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
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
    open: false,
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
      if (emotionState.responses[8] > 1) suicideNotice();
      //console.log(emotionState.responses);
      else if (emotionState.responses[8] === 1) {
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
        history.push('/');
      }
      // createEmotion(
      //   localStorage.getItem('uid'),
      //   date,
      //   emotionState.responses
      // ).then(() => {
      //   getEmotions(localStorage.getItem('uid')).then((res) => {
      //     if (res && res.data.length > 0) {
      //       res.data.sort(function (a, b) {
      //         return new Date(b.dates) - new Date(a.dates);
      //       });
      //       props.onSetSurveys(res.data);
      //     }
      //   });
      // });
      // history.push('/surveys');
    } else alert('You are not registered to enter a survey');
  };

  const handleChange = (rating, index) => {
    var temp = [...emotionState.responses];
    temp[index] = rating;
    setEmotionState({ responses: temp });
  };

  const suicideNotice = () => {
    setEmotionState({ ...emotionState, open: true });
  };

  const handleClose = () => {
    setEmotionState({ ...emotionState, open: false });
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
                Submit survey
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
      <Dialog
        aria-labelledby="simple-dialog-title"
        aria-describedby="alert-dialog-description"
        open={emotionState.open}
        onClose={handleClose}
      >
        <DialogTitle id="simple-dialog-title">Notice</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We noticed you indicated you’re having some thoughts about hurting
            yourself. We’re sorry you’re struggling right now. If you feel you
            can’t keep yourself safe, please call 911 or the suicide hotline.
            Here are some more resources that might be useful:
            <br /> <br />
            Helpline Phone Numbers: <br />
            <ul>
              <li>
                National Helpline for Mental Health and/or Substance Use
                1-800-662-HELP (4357){' '}
              </li>
              <li>Suicide Prevention Hotline 1-800-273-TALK </li>
              <li>Crisis Text Line - text START to 741-741</li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            I UNDERSTAND
          </Button>
        </DialogActions>
      </Dialog>
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
