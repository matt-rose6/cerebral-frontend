import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getUser } from '../../../../../services/UserServices/userServices';
import { updateUser } from '../../../../../services/UserServices/userServices';

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
    marginLeft: '20px',
  },
  enterBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    alignItems: 'flex-end',
  },
});

function EditBox(props) {
  const { classes } = props;

  const [editBoxState, setBoxState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    pass: '',
    outreach: false,
    errors: [],
  });

  useEffect(() => {
    if (localStorage.getItem('uid')) {
      getUser(localStorage.getItem('uid')).then((res) => {
        const user = res.data[0];
        if (res)
          setBoxState({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            pass: user.pass,
            outreach: user.outreach,
            errors: [],
          });
      });
    }
  }, []);

  //validate email using regular expressions
  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    var temp = [...editBoxState.errors];
    temp[0] = editBoxState.firstname.trim().length === 0;
    temp[1] = editBoxState.lastname.trim().length === 0;
    temp[2] = !validateEmail(editBoxState.email);
    setBoxState({ ...editBoxState, errors: temp });

    if (!temp[0] && !temp[1] && !temp[2]) {
      if (localStorage.getItem('uid')) {
        updateUser(
          localStorage.getItem('uid'),
          editBoxState.firstname,
          editBoxState.lastname,
          editBoxState.email,
          editBoxState.pass,
          editBoxState.outreach
        ).then((result) => {
          if (result.data.error) {
            console.log(result.data.error)
            temp[3] = true;
            setBoxState({ ...editBoxState, errors: temp });
          } else window.location.reload(false);
        });
      }
    }
  };

  const handleCheckBox = () => {
    const temp = !editBoxState.outreach;
    setBoxState({ ...editBoxState, outreach: temp });
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <TextField
          value={editBoxState.firstname || ''}
          error={
            editBoxState.firstname.trim().length < 1 && editBoxState.errors[0]
          }
          helperText={
            editBoxState.firstname.trim().length < 1 && editBoxState.errors[0]
              ? 'Enter first name.'
              : null
          }
          fullWidth
          onChange={(event) =>
            setBoxState({ ...editBoxState, firstname: event.target.value })
          }
          label="First Name"
        />
        <TextField
          value={editBoxState.lastname || ''}
          error={
            editBoxState.lastname.trim().length < 1 && editBoxState.errors[1]
          }
          helperText={
            editBoxState.lastname.trim().length < 1 && editBoxState.errors[1]
              ? 'Enter last name.'
              : null
          }
          fullWidth
          onChange={(event) =>
            setBoxState({ ...editBoxState, lastname: event.target.value })
          }
          label="Last Name"
        />
        <TextField
          value={editBoxState.email || ''}
          error={
            (!validateEmail(editBoxState.email) && editBoxState.errors[2]) ||
            editBoxState.errors[3]
          }
          helperText={
            !validateEmail(editBoxState.email) && editBoxState.errors[2]
              ? 'Enter a valid email.'
              : null || editBoxState.errors[3]
              ? 'Another user already exists with this email.'
              : null
          }
          fullWidth
          color="primary"
          onChange={(event) =>
            setBoxState({ ...editBoxState, email: event.target.value })
          }
          label="Email Address"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={editBoxState.outreach}
              onClick={handleCheckBox}
              color="primary"
            />
          }
          label={'Subscribed to notifications and reminders'}
        />
      </div>
      <AppBar
        className={classes.enterBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Done
              </Button>
              <Button variant="contained" onClick={props.toggle}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

export default withStyles(styles)(EditBox);
