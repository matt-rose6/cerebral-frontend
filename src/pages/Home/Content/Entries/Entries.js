import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { createEntry } from '../../../../services/EntryServices/entryServices';
import history from '../../../../services/history';

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  enterBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    alignItems: 'center',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  textfield: {
    width: '96%',
    marginLeft: '2%', //change this 
    marginRight: '2%'
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Entries(props) {
  const { classes } = props;

  const [text, setText] = useState("");

  const handleAddEntry = (text) => {
    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
    if(localStorage.getItem('uid')) {
      createEntry(localStorage.getItem('uid'), date, text);
      props.onAddEntry(localStorage.getItem('uid'), date, text);
      history.push('/')
    }
    else alert('You are not registered to make a journal entry');
  };

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs>
          <TextField
            className={classes.textfield}
            id="standard-multiline-static"
            margin="dense"
            label="New Entry"
            multiline
            rows="10"
            onChange={(event)=> setText(event.target.value)}
          />
        </Grid>
      </ Grid>
      <AppBar className={classes.enterBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button
                variant="contained" 
                color="primary" 
                onClick={() => handleAddEntry(text)}>
                  Add entry
              </Button>
              <Button
                variant="contained" 
                onClick={() => history.push('/')}>
                  Cancel
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

Entries.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onAddEntry: (uid, dates, entry) => dispatch({type: actionTypes.ADD_ENTRY, val: {uid: uid, dates: dates, entry: entry}})
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Entries));