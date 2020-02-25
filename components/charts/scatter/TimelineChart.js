import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend } from 'recharts';

const TimelineChart = ({ data }) => {
  const domain = [0, Math.max.apply(Math, data.map((d) => d.size))];
  const range = [0, 1000];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ScatterChart
        width={1000}
        height={80}
        margin={{top: 20, right: 0, bottom: 0, left: 0}}
      >
        <XAxis type="category" dataKey="x" interval={0} tickLine={false} />
        <YAxis type="number" dataKey="y" height={20} width={80} tick={false} tickLine={false} axisLine={false} />
        <ZAxis type="number" dataKey="size" domain={domain} range={range} />
        <Scatter data={data} fill='#8884d8'/>
      </ScatterChart>
    </div>
  );
};

export default TimelineChart;
