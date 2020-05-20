import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EmotionSlider from './EmotionSlider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { cesdr } from './Survey/Survey'; //can import phq9 as well
import { createEmotion } from '../../../../services/EmotionServices/emotionServices';
import history from '../../../../services/history';

const styles = theme => ({
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
  }
});

function Emotions(props) {
  const { classes } = props;

  const [emotionState, setEmotionState] = useState({
	responses: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  });

  const handleSubmit = () => {
	var tempDate = new Date();
	var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
	if(localStorage.getItem('uid')){
		createEmotion(localStorage.getItem('uid'), date, emotionState.responses);
		//alert('Your survey was successfully recorded');
		history.push('/surveys') 

		//TODO: change this after demo
		//window.location.reload(false)
	} else alert('You are not registered to enter a survey');
  }

  const handleSlider = (rating, index) => { 
	var temp = [...emotionState.responses]
	temp[index] = rating; 
	setEmotionState({responses: temp});
  }

  return (
	<Paper className={classes.paper}>
		<Typography align="center" paragraph variant="h6" className={classes.title}>
			Over the last week, how often have you been bothered by any of the following problems?
		</Typography>
		{cesdr.map((question, index) => {
			return <EmotionSlider 
				title={question} 
				key={index}
				index={index}
				handleSlider={handleSlider}/>
		})}
		<AppBar className={classes.entryBar} position="static" color="default" elevation={0}>
			<Toolbar>
				<Grid container spacing={2} alignItems="center">
					<Grid item>
					<Button 
						variant="contained" 
						color="primary" 
						onClick={handleSubmit}
					>
						Add survey
					</Button>
					<Button
						variant="contained" 
						onClick={() => history.push('/surveys')}>
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

export default withStyles(styles)(Emotions);