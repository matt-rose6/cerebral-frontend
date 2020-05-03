import React from 'react';
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
import { getEntries } from '../../../../services/EntryServices/entryService';

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
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
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

const showEntries = () => {
  let lst = (
    <Typography color="textSecondary" align="center">
      No journal entries yet
    </Typography>
  );
  // if(localStorage.getItem('uid')){
  //   getEntries(localStorage.getItem('uid')).then(res => {
  //     if(res && res.data.length > 0) {
  //       const entryList = res.data.map((child) => {
  //         <li key={child.dates}>
  //           {child.entry}
  //           {child.dates}
  //         </li>
  //       });
  //     lst = <ul>{entryList}</ul>
  //     } 
  //   })
  // }
  return (<div>{lst}</div>);
} 

function Content(props) {
  const { classes } = props;

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
                <IconButton>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        {showEntries()}
        {/* <Typography color="textSecondary" align="center">
          No journal entries yet
        </Typography> */}
      </div>
    </Paper>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);