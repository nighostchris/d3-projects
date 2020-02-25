import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend } from 'recharts';
import Card from '../../global/Card';

const TimelineChart = ({ header, data }) => {
  const domain = [0, Math.max.apply(Math, data.map((d) => d.size))];
  const range = [0, 1000];

  return (
    <Card header={header}>
      <ResponsiveContainer width="100%" height={80}>
        <ScatterChart width={1000} height={80} margin={{top: 20, right: 0, bottom: 0, left: -60}}>
          <XAxis type="category" dataKey="x" interval={0} tickLine={false} />
          <YAxis type="number" dataKey="y" height={20} tick={false} tickLine={false} axisLine={false} />
          <ZAxis type="number" dataKey="size" domain={domain} range={range} />
          <Scatter data={data} fill='#8884d8'/>
        </ScatterChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TimelineChart;
