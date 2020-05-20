import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { getUser } from '../../../../../services/UserServices/userServices';

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

    const [ settingBoxState, setBoxState ] = useState({
        firstname: '',
        lastname: '',
        email: '',
        outreach: false
    });

    useEffect(() => {
        if(localStorage.getItem('uid')){
            getUser(localStorage.getItem('uid')).then(res => {
                if(res && res.data[0]){
                    const user=res.data[0];
                    setBoxState({firstname: user.firstname, lastname: user.lastname, email: user.email, outreach: user.outreach})
                }
            })
        }
      }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload(false);
    }

    return (
        <Paper className={classes.paper}>
            <div className= {classes.root}>
                <Typography > {"First Name: " + settingBoxState.firstname}</ Typography>
                <Typography> {"Last Name: " + settingBoxState.lastname} </Typography>
                <Typography> {"Primary Email Address: " + settingBoxState.email} </Typography>
                <FormControlLabel 
                    control={<Checkbox color="primary" checked={settingBoxState.outreach} disableRipple/>} 
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

export default withStyles(styles)(SettingsBox);