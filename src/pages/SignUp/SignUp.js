import React, {Component} from 'react';
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

const styles = theme => ({
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

  constructor(props){
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      outreach: false,
      redirect: false
    }
  }

  //validate email using regular expressions
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleSubmit = () => {
    //error handling
    if(this.state.firstname.length===0){
      alert('Please enter your first name.');
    } else if(this.state.lastname.length===0){
      alert('Please enter your last name.');
    } else if(!this.validateEmail(this.state.email)){
      alert('Please enter a valid email address.');
    }else if(this.state.password.length<5){
      alert('Please enter a password that is 5 characters or longer');
    }
    else {
      createUser(this.state.firstname, this.state.lastname, this.state.email, this.state.password, this.state.outreach).then(() => { 
        authenticateUser(this.state.email, this.state.password).then((res) => {
          if(res && res.data.success) {
            localStorage.clear()
            console.log(res.data.token)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('uid', res.data.user.uid)
            this.setState({ redirect: true }); //only execute if authentication works
          } else if(res){
            alert(res.data.err)
          } else {
            alert('Login request could not be processed.')
          }
        })
      })
    }
  };

  handleFirstNameChange = (event) => {
    this.setState({firstname: event.target.value});
  }

  handleLastNameChange = (event) => {
    this.setState({lastname: event.target.value});
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePassChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleOutreachChange = (event) => {
    this.setState({outreach: event.target.checked});
  }

  render() {
    const { classes } = this.props;
    if(this.state.redirect) return <Redirect to='/'/>

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img style={{width: '75px', height: '75px'}} src={Logo} alt = "Cerebral Logo"/>
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
                  onChange={(event) => this.handleFirstNameChange(event)}
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
                  onChange={(event) => this.handleLastNameChange(event)}
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
                  onChange={(event) => this.handleEmailChange(event)}
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
                  onChange={(event) => this.handlePassChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive journaling reminders and updates via email"
                  onChange={(event) => this.handleOutreachChange(event)}
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

export default withStyles (styles, {withTheme: true}) (SignUp);
