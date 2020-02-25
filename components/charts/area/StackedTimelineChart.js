import React from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const StackedTimelineChart = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <AreaChart width={600} height={400} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="x"/>
        <YAxis tick={false} axisLine={false} />
        <Tooltip/>
        <Area type='monotone' dataKey="2010" stackId="1" stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' dataKey="2011" stackId="1" stroke='#82ca9d' fill='#82ca9d' />
        <Area type='monotone' dataKey="2012" stackId="1" stroke='#ffc658' fill='#ffc658' />
      </AreaChart>
    </div>
  );
};

export default StackedTimelineChart;
