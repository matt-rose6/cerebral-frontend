import React from 'react';
import { Chart } from 'react-charts';

function MyChart(props) {
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  const series = React.useMemo(
    () => ({
      showPoints: true
    }),
    []
  );

  // A react-chart hyper-responsively and continuously fills the available
  // space of its parent element automatically
  return (
    <div
      style={{
        margin: 'auto',
        width: '80%',
        height: '300px',
        marginBottom: '50px',
      }}
    >
      <Chart data={props.data} series={series} axes={axes} tooltip />
    </div>
  );
}

export default MyChart;
