import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Post from './Post/EntryPost';
import history from '../../../../services/history';
import CalendarHeatmap from 'react-calendar-heatmap';
import Calendar from '../Calendar/Calendar';
import '../style.css';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  entryBar: {
    alignItems: 'center',
  },
});

function Timeline(props) {
  const { classes } = props;
  let heatObj = [];

  let lst =
    props.entries.length === 0 ? (
      <Typography color="textSecondary" align="center">
        No journal entries yet
      </Typography>
    ) : (
      props.entries.map((child, index) => {
        const heatPoint = {
          date: new Date(child.dates),
          count: 1,
        };
        heatObj.push(heatPoint);

        return <Post text={child.entry} date={child.dates} key={child.dates} />; //deletePost={()=>deletePost(index)}/>
      })
    );

  let heatmap =
    heatObj.length === 0 ? (
      <div />
    ) : (
      <CalendarHeatmap
        startDate={new Date('2020-01-01')}
        endDate={new Date('2021-01-01')}
        values={heatObj}
      />
    );

  return (
    <>
      <Paper className={classes.paper}>
        <AppBar
          className={classes.entryBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  align="center"
                  onClick={() => {
                    history.push('/addEntry');
                  }}
                >
                  Write a new entry
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by date"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                />
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton onClick={() => window.location.reload(false)}>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>{lst}</div>
      </Paper>
    </>
  );
}

Timeline.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Timeline));
