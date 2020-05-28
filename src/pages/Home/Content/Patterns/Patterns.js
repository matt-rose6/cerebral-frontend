import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Post from './Post/PatternPost';
import Typography from '@material-ui/core/Typography';

function Pattern(props) {
    let lst = props.entries.length===0? (
        <Typography color="textSecondary" align="center">
          No sentiment analyses yet
        </Typography>
      ) : 
      (
        props.entries.map((child, index)=> {
          return <Post text={child.entry} date={child.dates} key={child.dates} /> //deletePost={()=>deletePost(index)}/>
        })
      )

    return (
        <div>
          <Typography variant="h6" align="center" paragraph> 
            Sentiment Analysis
          </Typography>
            {lst}
        </div>
    )
}

const mapStateToProps = state => {
  return {
    entries: state.entries
  }
}

export default connect(mapStateToProps)(Pattern);