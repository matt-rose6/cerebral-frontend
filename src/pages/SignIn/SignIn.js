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
import { authenticateUser } from '../../services/AuthServices/authServices';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MaterialLink color="inherit" href="https://github.com/matt-rose6/">
        Matthew Rose, 
      </MaterialLink>{''}
      {' ' + new Date().getFullYear()}
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: '',
      remember: false,
      redirect: false
    }
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value});
  }

  handlePassChange = (event) => {
    this.setState({pass: event.target.value});
  }

  handleRememberChange = (event) => {
    this.setState({remember: event.target.checked});
  }

  handleSubmit = () => {
    authenticateUser(this.state.email, this.state.pass).then(res => {
      //console.log(res)
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
  }

  render() {
    const { classes } = this.props;
    if(this.state.redirect){
      return <Redirect to='/'/> 
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <img style={{width: '75px', height: '75px'}} src={Logo} alt = "Cerebral Logo" />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {(event) => this.handleEmailChange(event)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(event) => this.handlePassChange(event)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange = {(event)=> this.handleRememberChange(event)}/>}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick ={this.handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <MaterialLink href="#" variant="body2">
                  Forgot password?
                </MaterialLink>
              </Grid>
              <Grid item>
                <MaterialLink href="register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </MaterialLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles (styles, {withTheme: true}) (SignIn);