import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EmotionSlider from './EmotionSlider';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  entryBar: {
	borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	alignItems: 'center',
	maxWidth: 936,
	margin: 'auto',
    overflow: 'hidden',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  title: {
	  marginLeft: '93px',
	  marginBottom: '30px',
  }
});

function Emotions(props) {
  const { classes } = props;

  return (
	<Fragment>
		<div className={classes.title}>
			<h2>Over the last 2 weeks, how often have you been bothered by any of the following problems?</h2>
		</div>
		<EmotionSlider
			title='Little interest or pleasure in doing things.'
		/>
		<EmotionSlider
			title='Feeling down, depressed, or hopeless.'
		/>
		<EmotionSlider
			title='Trouble falling or staying asleep, or sleeping too much.'
		/>
		<EmotionSlider
			title='Feeling tired or having little energy.'
		/>
		<EmotionSlider
			title='Poor appetite or overeating.'
		/>
		<EmotionSlider
			title='Feeling bad about yourself or that you are a failure or have let yourself or your family down.'
		/>
		<EmotionSlider
			title='Trouble concentrating on things, such as reading the newspaper or watching television.'
		/>
		<EmotionSlider
			title='Moving or speaking so slowly that other people could have noticed. Or the opposite: being so figety or restless that you have been moving around a lot more than usual.'
		/>
		<EmotionSlider
			title='Thoughts that you would be better off dead, or of hurting yourself.'
		/>
		<AppBar className={classes.entryBar} position="static" color="default" elevation={0}>
			<Toolbar>
				<Grid container spacing={2} alignItems="center">
					<Grid item>
					<Button 
						variant="contained" 
						color="primary" 
						//onClick={() => {handleAddEntry(text)}}
					>
						Add survey
					</Button>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	</Fragment>
  );
}

Emotions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Emotions);