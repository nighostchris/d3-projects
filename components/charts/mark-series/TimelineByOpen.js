import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend } from 'recharts';
import extendDate from '../../../utility/extendDate';

const TimelineByOpen = ({ data }) => {
  const extendedData = [];
  const extendDateList = extendDate(data[0].x, data[data.length - 1].x);

  extendDateList.map((date) => {
    let existed = false;
    data.forEach((d) => {
      if (date === d.x) {
        extendedData.push({x: d.x, y: 1, size: d.size});
        existed = true;
        return false;
      }
    });
    if (!existed) {
      extendedData.push({x: date, y: 1, size: 0});
    }
  });

  const domain = [0, Math.max.apply(Math, extendedData.map((d) => d.size))];
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
        <Scatter data={extendedData} fill='#8884d8'/>
      </ScatterChart>
    </div>
  );
};

export default TimelineByOpen;
