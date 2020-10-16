import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import WarningIcon from '@material-ui/icons/Warning';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
});

function Header(props) {
  const { classes, onDrawerToggle } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {'Welcome ' + props.firstname}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Read">
                <IconButton color="inherit" onClick={handleClickOpen}>
                  <WarningIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      ></AppBar>
      <Dialog
        aria-labelledby="simple-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="simple-dialog-title">Notice</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cerebral is not intended to be an substitute for traditional
            therapeutic services administered by trained professionals, and is
            not intended for people with severe mental illnesses. If this is an
            emergency or you feel you can’t keep yourself safe, please proceed
            immediately to your nearest emergency room, call 911, or call your
            local mental health crisis team.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            I UNDERSTAND
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    firstname: state.firstname,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Header));
