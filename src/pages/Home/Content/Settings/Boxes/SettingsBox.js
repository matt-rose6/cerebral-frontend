import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import { getUser } from '../../../../../services/UserServices/userServices';

const styles = theme => ({
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

function SettingsBox(props){
    const {classes} =  props;

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload(false);
    }

    return (
        <Paper className={classes.paper}>
            <div className= {classes.root}>
                <Typography > {"First Name: " + props.firstname}</ Typography>
                <Typography> {"Last Name: " + props.lastname} </Typography>
                <Typography> {"Primary Email Address: " + props.email} </Typography>
                <FormControlLabel 
                    control={<Checkbox color="primary" checked={props.outreach} disableRipple/>} 
                    label={"Subscribed to notifications and reminders"} />
                
            </div>
            <AppBar className={classes.enterBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.toggle}>
                                Edit
                            </Button>
                            <Button
                                variant="contained" 
                                onClick={handleLogout}>
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Paper>    
    )
}

const mapStateToProps = state => {
    return {
      firstname: state.firstname,
      lastname: state.lastname,
      email: state.email,
      outreach: state.outreach
    }
}

export default connect(mapStateToProps)(withStyles(styles)(SettingsBox));