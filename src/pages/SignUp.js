import React, {useState} from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import BrainIcon from './public/cerebralicon.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import Style from '../App.css';
//import Avatar from '@material-ui/core/Avatar';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/matt-rose6/">
        Matthew Rose,
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = props => {
  const [ signUpState, setSignUpState ] = useState({
    firstname: 'default',
    lastname: 'default',
    email: 'default',
    password: 'default',
    outreach: 'FALSE'
  });

  const classes = useStyles();

  const handleSubmit = () => {
    console.log(signUpState.firstname)
    Axios({
      method: 'post',
      url: 'http://localhost:3001/api/users/addUser',
      data: {
        "firstname": "matthew", //signUpState.firstname,
        "lastname": "rose", //signUpState.lastname,
        "email": "matt.rose@fdsfdsfds", //signUpState.email,
        "pass": "hello", //signUpState.password,
        "outreach": "TRUE"
      }
    })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/*<Avatar className={classes.avatar}>*/}
          {/*<BrainIcon />*/}
          <img style={{width: '75px', height: '75px'}} src={BrainIcon} alt = "Cerebral Logo"/>
          {/*</Avatar>*/}
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event, newVal) => setSignUpState({
                    firstname: newVal,
                    lastname: signUpState.lastname,
                    email: signUpState.email,
                    password: signUpState.password
                  })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={(event, newVal) => setSignUpState({
                    firstname: signUpState.firstname,
                    lastname: newVal,
                    email: signUpState.email,
                    password: signUpState.password
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event, newVal) => setSignUpState({
                    firstname: signUpState.firstname,
                    lastname: signUpState.lastname,
                    email: newVal,
                    password: signUpState.password
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event, newVal) => setSignUpState({
                    firstname: signUpState.firstname,
                    lastname: signUpState.lastname,
                    email: signUpState.email,
                    password: newVal
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive journaling reminders and updates via email"
                />
              </Grid>
            </Grid>
            <Button
              // type="submit"
              // fullWidth
              // variant="contained"
              // color="primary"
              // className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
}

export default SignUp;
