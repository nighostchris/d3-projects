import React from 'react';
import Card from '../../global/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const StackedTimelineChart = ({ header, data }) => {
  return (
    <Card header={header}>
      <ResponsiveContainer width="100%" height={600}>
        <AreaChart data={data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="x"/>
          <YAxis tick={false} axisLine={false} />
          <Tooltip/>
          <Legend />
          <Area type='monotone' dataKey="2010" stackId="1" stroke='#ff0000' fill='#ff0000' />
          <Area type='monotone' dataKey="2011" stackId="1" stroke='#800000' fill='#800000' />
          <Area type='monotone' dataKey="2012" stackId="1" stroke='#ffff00' fill='#ffff00' />
          <Area type='monotone' dataKey="2013" stackId="1" stroke='#808000' fill='#808000' />
          <Area type='monotone' dataKey="2014" stackId="1" stroke='#00ff00' fill='#00ff00' />
          <Area type='monotone' dataKey="2015" stackId="1" stroke='#008000' fill='#008000' />
          <Area type='monotone' dataKey="2016" stackId="1" stroke='#00ffff' fill='#00ffff' />
          <Area type='monotone' dataKey="2017" stackId="1" stroke='#008080' fill='#008080' />
          <Area type='monotone' dataKey="2018" stackId="1" stroke='#0000ff' fill='#0000ff' />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default StackedTimelineChart;
