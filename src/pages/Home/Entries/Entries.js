import React, { useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

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
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '115ch',
    },
  },
});

const handleAddEntry = (text) => {
  var tempDate = new Date();
  var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
  Axios({
    method: 'post',
    url: 'http://localhost:3001/api/entries/addEntry',
    data: {
      "uid": 2,
      "dates": date,
      "entry": text
    }
  });
};

function Entries(props) {
  const { classes } = props;

  const [text, setText] = useState("");

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                className={classes.addEntry}
                onClick={() => {handleAddEntry(text)}}>
                Add entry
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <TextField
          id="standard-multiline-static"
          label="New Entry"
          multiline
          rows="10"
          onChange={(event)=> setText(event.target.value)}
          //defaultValue="How are you feeling?"
        />
      </div>
    </Paper>
  );
}

Entries.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Entries);