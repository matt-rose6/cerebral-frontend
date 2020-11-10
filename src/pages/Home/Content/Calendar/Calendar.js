import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import history from '../../../../services/history';

const styles = () => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
  },
});

function Calendar(props) {
  const { classes } = props;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let entries = props.entries.map((entry, index) => {
      return {
        id: String(index),
        title: 'Journal Entry',
        content: entry.entry,
        sentiment: entry.score,
        start: new Date(entry.dates).toISOString().replace(/T.*$/, ''),
      };
    });
    let surveys = props.surveys.map((survey, index) => {
      return {
        id: String(index),
        title: 'BDI Survey',
        start: new Date(survey.dates).toISOString().replace(/T.*$/, ''),
      };
    });
    const events = entries.concat(surveys);
    setEvents(events);
  }, [props.entries, props.surveys]);

  const viewEntry = (arg) => {
    console.log(arg);
    history.push({
      pathname: '/event',
      state: {
        content: arg.content,
        score: arg.sentiment,
      },
    });
  };

  return (
    <Paper className={classes.paper}>
      <div style={{ width: '80%', margin: 'auto', padding: '20px' }}>
        <div className="demo-app-main" key={events}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            initialEvents={events}
            eventClick={(event) => viewEntry(event.event._def.extendedProps)}
          />
        </div>
      </div>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    surveys: state.surveys,
    entries: state.entries,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Calendar));
