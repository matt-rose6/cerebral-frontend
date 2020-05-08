import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container  from '@material-ui/core/Container';
import Logo from '../../../../public/cerebral_icon.png';

const About = () => (
    <div style={{textAlign: 'center'}}>
        <img style={{width: '75px', height: '75px', marginBottom: '10px'}} src={Logo} alt = "Cerebral Logo" />
        <Container maxWidth="sm">
            <Typography variant="h5" paragraph>
                What is Cerebral?
            </Typography>
            <Typography variant="body1">
                Cerebral is an app designed to help you keep track of your emotions and experiences in an organized and
                simple way. The app uses a journaling component and weekly surveys that
                measure feelings and behaviors associated with depression to try to find relationships between your thought 
                patterns and symptoms. 
                <br/> <br />
                The survey follows a well-documented and historically reliable scale called the CESD-R (Center for 
                Epidemiological Studies Depression Scale - Revised). The app uses machine learning and sentiment analysis
                to assess the results of this survey and their associations with your previous journal entries.
                <br /> <br />
                Feel free to reach out to the creator of this app at matt.rose@duke.edu if you have any questions, feedback,
                or concerns about Cerebral. 
            </Typography>
        </Container>
    </div>
)

export default About;