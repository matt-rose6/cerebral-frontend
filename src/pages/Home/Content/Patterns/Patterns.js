import React from 'react';
import { connect } from 'react-redux';
import Post from './Post/PatternPost';
import Chart from './Charts/Chart';
import Typography from '@material-ui/core/Typography';

function Pattern(props) {
  let dataObj = [{ label: 'Sentiment Score', data: [] }];
  let lst =
    props.entries.length === 0 ? (
      <Typography color="textSecondary" align="center">
        No sentiment analyses yet
      </Typography>
    ) : (
      props.entries.map((child, index) => {
        const temp = {
          primary: new Date(child.dates),
          secondary: parseFloat(child.score) + 0.001,
        };
        dataObj[0].data.push(temp);
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

  let chart = dataObj[0].data.length === 0 ? <div /> : <Chart data={dataObj} />;

  return (
    <div>
      <Typography variant="h6" align="center" paragraph>
        Sentiment Analysis
      </Typography>
      {chart}
      {lst}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
  };
};

export default connect(mapStateToProps)(Pattern);
