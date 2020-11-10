import React, { useState } from 'react';
import { connect } from 'react-redux';
import Post from './Post/PatternPost';
import Chart from './Charts/Chart';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  },
});

function Pattern(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);

  let chartObj = [{ label: 'Sentiment Score', data: [] }];
  let lst =
    props.entries.length === 0 ? (
      <Typography color="textSecondary" align="center">
        No sentiment analyses yet
      </Typography>
    ) : (
      props.entries.map((child, index) => {
        const chartPoint = {
          primary: new Date(child.dates),
          secondary: parseFloat(child.score) + 0.001,
        };
        chartObj[0].data.push(chartPoint);
        return (
          <Post
            sentiment={child.score}
            magnitude={child.magnitude}
            date={child.dates}
            key={child.dates}
          />
        ); //deletePost={()=>deletePost(index)}/>
      })
    );

  let chart =
    chartObj[0].data.length === 0 ? <div /> : <Chart data={chartObj} />;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h6" paragraph align="center">
        Sentiment Analysis
      </Typography>
      <Paper className={classes.paper}>
        <div style={{ marginTop: 30 }}>{chart}</div>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Link component="button" variant="body2" onClick={handleOpen}>
            How should I interpret my scores?
          </Link>
        </div>
        {/* {lst} */}
        <Dialog
          aria-labelledby="simple-dialog-title"
          aria-describedby="alert-dialog-description"
          open={open}
          onClose={handleClose}
        >
          <DialogTitle id="simple-dialog-title">Sentiment Analysis</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Sentiment analysis indicates how positive or negative a section of
              text is. The scores range from -1 (most negative) to 1 (most
              positive). These scores are subjective and do not necessarily
              correspond to your depressive symptoms. However, they can
              sometimes be a helpful way for you and your therapist to better
              understand and evaluate your moods over time.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              I UNDERSTAND
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Pattern));
