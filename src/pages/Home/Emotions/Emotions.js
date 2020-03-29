import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import EmotionSlider from './emotionSlider';
//import Tooltip from '@material-ui/core/Tooltip';
//import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
//import SearchIcon from '@material-ui/icons/Search';
//import RefreshIcon from '@material-ui/icons/Refresh';

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addEntry: {
    marginRight: theme.spacing(1),
  },
});

function Emotions(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      {/* // <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
      //   <Toolbar>
      //     <Grid container spacing={2} alignItems="center">
      //       <Grid item>
      //         <Button variant="contained" color="primary" className={classes.addEntry}>
      //           Add entry
      //         </Button>
      //       </Grid>
      //     </Grid>
      //   </Toolbar>
      // </AppBar>*/}
      	<p>Over the last 2 weeks, how often have you been bothered by any of the following problems?</p>
    	<EmotionSlider
  			title='1. Little interest or pleasure in doing things'
  		/>
  		<EmotionSlider
  			title='2. Feeling down, depressed, or hopeless'
  		/>
  		<EmotionSlider
  			title='3. Trouble falling or staying asleep, or sleeping too much'
  		/>
  		<EmotionSlider
  			title='4. Feeling tired or having little energy'
  		/>
  		<EmotionSlider
  			title='5. Poor appetite or overeating'
  		/>
  		<EmotionSlider
  			title='6. Feeling bad about yourself or that you are a failure or have let yourself or your family down'
  		/>
  		<EmotionSlider
  			title='7. Trouble concentrating on things, such as reading the newspaper or watching television'
  		/>
  		<EmotionSlider
  			title='8. Moving or speaking so slowly that other people could have noticed. Or the opposite being so figety or restless that you have been moving around a lot more than usual'
  		/>
  		<EmotionSlider
  			title='9. Thoughts that you would be better off dead, or of hurting yourself'
  		/>
    </Paper>
  );
}

Emotions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Emotions);