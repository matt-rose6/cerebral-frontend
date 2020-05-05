import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import EmotionSlider from './EmotionSlider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {phq9, cesdr} from './Survey/Survey';

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
  return (
	<Paper className={classes.paper}>
		<Typography align="center" paragraph variant="h6" className={classes.title}>
			Over the last week, how often have you been bothered by any of the following problems?
		</Typography>
		{cesdr.map((question, index) => {
			return <EmotionSlider title={question} key={index}/>
		})}
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
	</Paper>
  );
}

Emotions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Emotions);