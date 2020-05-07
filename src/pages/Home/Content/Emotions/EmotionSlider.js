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
      width: '80%',
      marginLeft: '20px',
  },
  slider: {
    marginLeft: '55px',
  }
});

//phqr labels
// const marks = [
//   {
//     value: 0,
//     label: 'Not at all',
//   },
//   {
//     value: 33,
//     label: 'Several days',
//   },
//   {
//     value: 67,
//     label: 'More than half the days',
//   },
//   {
//     value: 100,
//     label: 'Nearly every day',
//   },
// ];

//cesdr labels
const marks = [
  {
    value: 0,
    label: 'Less than 1 day',
  },
  {
    value: 33,
    label: '1-2 days',
  },
  {
    value: 67,
    label: '3-4 days',
  },
  {
    value: 100,
    label: '5-7 days',
  },
];

// function valueLabelFormat(value) {
//   return marks.findIndex(mark => mark.value === value);
// }

const EmotionSlider = (props) => {
	const {classes} = props;
	return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <Typography id="discrete-slider-restrict" paragraph>
          {props.title}
        </Typography>
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          marks={marks}
          className={classes.slider}
          onChangeCommitted={(_event, value) => props.handleSlider(value, props.index)}
          // onChangeCommitted={()=> console.log('temp')}
        />
      </div>
    </ Paper>
  )
};

export default withStyles(styles)(EmotionSlider);