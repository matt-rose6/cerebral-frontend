import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MaterialLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Logo from '../../public/cerebral_icon.png';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { createUser } from '../../services/UserServices/userServices';
import { authenticateUser } from '../../services/AuthServices/authServices';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MaterialLink color="inherit" href="https://github.com/matt-rose6/">
        Matthew Rose,
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      repassword: '',
      outreach: false,
      redirect: false,
      errors: [],
    };
  }

  //validate email using regular expressions
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleSubmit = () => {
    //error handling
    var temp = [...this.state.errors];
    temp[0] = this.state.firstname.trim().length === 0;
    temp[1] = this.state.lastname.trim().length === 0;
    temp[2] = !this.validateEmail(this.state.email);
    temp[3] = this.state.password.trim().length < 5;
    this.setState({ errors: temp });

    if (
      !temp[0] &&
      !temp[1] &&
      !temp[2] &&
      !temp[3] &&
      this.state.password === this.state.repassword
    ) {
      createUser(
        this.state.firstname,
        this.state.lastname,
        this.state.email,
        this.state.password,
        this.state.outreach
      ).then((result) => {
        //check if this email already exists in database
        if(result.data.error){
          temp[4] = true;
          this.setState({errors:temp});
        } else{
            authenticateUser(this.state.email, this.state.password).then((res) => {
            if (res && res.data.success) {
              localStorage.clear();
              console.log(res.data.token)
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('uid', res.data.user.uid);
              this.setState({ redirect: true }); //only execute if authentication works
            } else {
              alert('Login request could not be processed.')
            }
          });
        }
      });
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirect) return <Redirect to="/" />;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img
            style={{ width: '75px', height: '75px' }}
            src={Logo}
            alt="Cerebral Logo"
          />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={
                    this.state.firstname.trim().length < 1 &&
                    this.state.errors[0]
                  }
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  helperText={
                    this.state.firstname.trim().length < 1 &&
                    this.state.errors[0]
                      ? 'Enter first name.'
                      : null
                  }
                  onChange={(event) =>
                    this.setState({ firstname: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={
                    this.state.lastname.trim().length < 1 &&
                    this.state.errors[1]
                  }
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  helperText={
                    this.state.lastname.trim().length < 1 &&
                    this.state.errors[1]
                      ? 'Enter last name.'
                      : null
                  }
                  onChange={(event) =>
                    this.setState({ lastname: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    !this.validateEmail(this.state.email) &&
                    this.state.errors[2] ||
                    this.state.errors[4]
                  }
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={
                    !this.validateEmail(this.state.email) &&
                    this.state.errors[2]
                      ? 'Enter a valid email.'
                      : null ||
                      this.state.errors[4] 
                      ? 'A user already exists with this email.'
                      : null
                  }
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    this.state.password.trim().length < 5 &&
                    this.state.errors[3]
                  }
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={
                    this.state.password.trim().length < 5 &&
                    this.state.errors[3]
                      ? 'Enter a valid email.'
                      : null
                  }
                  onChange={(event) =>
                    this.setState({ password: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={this.state.password !== this.state.repassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="repassword"
                  label="Re-Enter Password"
                  type="password"
                  id="repassword"
                  autoComplete="current-password"
                  helperText={
                    this.state.password !== this.state.repassword
                      ? "Passwords don't match."
                      : null
                  }
                  onChange={(event) =>
                    this.setState({ repassword: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive journaling reminders and updates via email"
                  onChange={(event) =>
                    this.setState({ outreach: event.target.checked })
                  }
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <MaterialLink href="/login" variant="body2">
                  Already have an account? Sign in
                </MaterialLink>
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
}

export default withStyles(styles, { withTheme: true })(SignUp);
