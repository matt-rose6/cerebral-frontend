import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Logo from '../../../../public/cerebral_icon.png';

const About = () => (
  <div style={{ textAlign: 'center' }}>
    <img
      style={{ width: '75px', height: '75px', marginBottom: '10px' }}
      src={Logo}
      alt="Cerebral Logo"
    />
    <Container maxWidth="md">
      <Typography variant="h5" paragraph>
        What is Cerebral?
      </Typography>
      <Typography component={'span'} variant="body1">
        Cerebral is an app designed to help you keep track of your emotions and
        experiences in an organized and simple way. The app uses a journaling
        component and weekly surveys that measure feelings and behaviors
        associated with depression to try to find relationships between your
        thought patterns and symptoms. The app uses the Beck Depression
        Inventory to help assess these symptoms, and sentiment analysis to
        analyze the contents of your journal entries.
        <br /> <br />
        Cerebral is meant to be a tool to help facilitate understanding between
        you and your therapist, and we are always trying to find ways to improve
        this connection. Feel free to reach out to the creator of this app at
        matt.rose@duke.edu if you have any questions, feedback, or concerns
        about Cerebral.
        <br /> <br />
        Cerebral is not intended to be an substitute for traditional therapeutic
        services administered by trained professionals. It is not intended for
        people with severe mental illnesses. If this is an emergency or you feel
        you can’t keep yourself safe, please:
        <br /> <br />
        <ul style={{ display: 'inline-block', textAlign: 'left' }}>
          <li>proceed immediately to your nearest emergency room, </li>
          <li>call 911, </li>
          <li>or call your local mental health crisis team </li>
        </ul>
      </Typography>
    </Container>
  </div>
);

export default About;
