import React from 'react';
import Slider from '@material-ui/core/Slider';
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
  slider: {
    marginLeft: '55px',
  }
});

const marks = [
  {
    value: 0,
    label: 'Not at all',
  },
  {
    value: 33,
    label: 'Several days',
  },
  {
    value: 67,
    label: 'More than half the days',
  },
  {
    value: 100,
    label: 'Nearly every day',
  },
];

// function valueLabelFormat(value) {
//   return marks.findIndex(mark => mark.value === value);
// }

const EmotionSlider = (props) => {
	const {classes} = props;
	return (
    <Paper className={classes.paper}>
      <div className= {classes.root}>
            <Typography id="discrete-slider-restrict" gutterBottom>
              {props.title}
            </Typography>
            <Slider
              defaultValue={0}
              //valueLabelFormat={valueLabelFormat}
              aria-labelledby="discrete-slider-restrict"
              step={null}
              //valueLabelDisplay="auto"
              marks={marks}
              className={classes.slider}
        />
      </div>
      </ Paper>
    )
};

export default withStyles(styles)(EmotionSlider);