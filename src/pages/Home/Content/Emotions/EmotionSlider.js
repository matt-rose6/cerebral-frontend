import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
    width: '80%',
    marginLeft: '20px',
  },
  slider: {
    marginLeft: '55px',
  },
  sliderValue: {
    width: '10%',
  },
});

const EmotionSlider = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{props.index + 1}</FormLabel>
          <RadioGroup
            aria-label={props.index + 1}
            name={props.index + 1}
            value={props.value}
            onChange={(event) =>
              props.handleChange(parseInt(event.target.value), props.index)
            }
          >
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label={props.q1}
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label={props.q2}
            />
            <FormControlLabel
              value="3"
              control={<Radio color="primary" />}
              label={props.q3}
            />
            <FormControlLabel
              value="4"
              control={<Radio color="primary" />}
              label={props.q4}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(EmotionSlider);
