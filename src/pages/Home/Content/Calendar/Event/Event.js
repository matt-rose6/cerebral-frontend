import React from 'react';

const Event = (props) => {
  console.log(props);
  return (
    <>
      <div>{props.location.state.content}</div>
      <div>{props.location.state.score}</div>
    </>
  );
};

export default Event;
