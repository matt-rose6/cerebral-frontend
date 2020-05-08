import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
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
import { getEntries } from '../../../../services/EntryServices/entryServices';
import Post from './Post/EntryPost';

const styles = theme => ({
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
});

function Content(props) {
  const { classes } = props;

  const [ timelineState, setTimelineState ] = useState({
    posts: []
  });

  useEffect(()=> {
    if(localStorage.getItem('uid')){
      getEntries(localStorage.getItem('uid')).then(res => {
        if(res && res.data.length > 0) {
          //reverse the array so most recent entries show up first
          setTimelineState({posts: res.data.reverse()})
        }
      })
    }
  }, []);

  const deletePost = (id) => {
    const temp = timelineState.posts.filter((_el, index) => index !== id)
    //console.log(temp)
    setTimelineState({posts: temp})
  }

  let lst = timelineState.posts.length===0? (
    <Typography color="textSecondary" align="center">
      No journal entries yet
    </Typography>
  ) : 
  (
    timelineState.posts.map((child, index)=> {
      return <Post text={child.entry} date={child.dates} key={child.dates} deletePost={()=>deletePost(index)}/>
    })
  )

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
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
                <IconButton onClick={()=> window.location.reload(false)}>
                  <RefreshIcon className={classes.block} color="inherit"/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {lst}
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);