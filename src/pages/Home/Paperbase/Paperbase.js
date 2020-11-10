import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionTypes from '../../../store/actions';
import { Switch, Route } from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider,
  withStyles,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from '../Navigator/Navigator';
import Header from '../Header/Header';
import {
  Emotions,
  Entries,
  Patterns,
  Settings,
  Timeline,
  About,
  Surveys,
  NotFound,
  Calendar,
  Event,
} from '../Content';
import { getUser } from '../../../services/UserServices/userServices';
import { getEntries } from '../../../services/EntryServices/entryServices';
import { getEmotions } from '../../../services/EmotionServices/emotionServices';

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

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
};

function Paperbase(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (localStorage.getItem('uid')) {
      getUser(localStorage.getItem('uid')).then((res) => {
        if (res && res.data) {
          props.onSetFirstName(res.data.firstname); //setHeaderState({username: res.data[0].firstname})
          props.onSetLastName(res.data.lastname);
          props.onSetEmail(res.data.email);
          props.onSetOutreach(res.data.outreach);
        }
      });
      getEntries(localStorage.getItem('uid')).then((res) => {
        if (res && res.data.length > 0) {
          res.data.sort(function (a, b) {
            return new Date(b.dates) - new Date(a.dates);
          });
          props.onSetEntries(res.data);
        }
      });
      getEmotions(localStorage.getItem('uid')).then((res) => {
        if (res && res.data.length > 0) {
          res.data.sort(function (a, b) {
            return new Date(b.dates) - new Date(a.dates);
          });
          props.onSetSurveys(res.data);
        }
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <main className={classes.main}>
            <Switch>
              <Route path="/" exact component={Calendar} />
              <Route path="/event" exact component={Event} />
              <Route path="/entries" exact component={Timeline} />
              <Route path="/surveys" exact component={Surveys} />
              <Route path="/addEntry" exact component={Entries} />
              <Route path="/addSurvey" exact component={Emotions} />
              <Route path="/patterns" exact component={Patterns} />
              <Route path="/settings" exact component={Settings} />
              <Route path="/about" exact component={About} />
              <Route path="/" component={NotFound} />
            </Switch>
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    // set user's state
    onSetFirstName: (first) =>
      dispatch({ type: actionTypes.SET_FIRSTNAME, val: first }),
    onSetLastName: (last) =>
      dispatch({ type: actionTypes.SET_LASTNAME, val: last }),
    onSetEmail: (email) =>
      dispatch({ type: actionTypes.SET_EMAIL, val: email }),
    onSetOutreach: (outreach) =>
      dispatch({ type: actionTypes.SET_OUTREACH, val: outreach }),
    // set entry []
    onSetEntries: (entries) =>
      dispatch({ type: actionTypes.SET_ENTRIES, val: entries }),
    // set survey []
    onSetSurveys: (surveys) =>
      dispatch({ type: actionTypes.SET_SURVEYS, val: surveys }),
    // set sentiment []
    onSetSentiments: (sentiments) =>
      dispatch({ type: actionTypes.SET_SENTIMENTS, val: sentiments }),
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Paperbase));
