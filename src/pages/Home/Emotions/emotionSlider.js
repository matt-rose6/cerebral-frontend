import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
  		margin: theme.spacing(1),
    	width: 800,
  },
});

const marks = [
  {
    value: 25,
    label: 'Not at all',
  },
  {
    value: 50,
    label: 'Several days',
  },
  {
    value: 75,
    label: 'More than half the days',
  },
  {
    value: 100,
    label: 'Nearly every day',
  },
];

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value);
}

const EmotionSlider = (props) => {
	const {classes} = props;
	return (
		<div className= {classes.root}>
      		<Typography id="discrete-slider-restrict" gutterBottom>
        		{props.title}
      		</Typography>
        	<Slider
  				defaultValue={25}
  				valueLabelFormat={valueLabelFormat}
  				//getAriaValueText={label}
  				aria-labelledby="discrete-slider-restrict"
  				step={null}
  				valueLabelDisplay="auto"
 	 			marks={marks}
			/>
    	</div>
    )
};

export default withStyles(styles)(EmotionSlider);