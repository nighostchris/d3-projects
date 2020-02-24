import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

let _ = require('lodash');

const years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];

const TimelineByOpen = (props) => {
  let test = [];
  const process = props.data;
  years.forEach((year) => {
    test.push(props.data[year][0]["open"][0]);
  });
  test = _.countBy(test);
  const domain = [1, 2];
  const range = [100, 225];

  const data = Object.keys(test).map((key) => {
    //const splitDate = key.split("/");
    //new Date(, splitDate[0], splitDate[1] - 1)
    return {x: key, y: 1, size: test[key]};
  });

  console.log(data);

  return (
    <ScatterChart width={800} height={60} margin={{top: 10, right: 0, bottom: 0, left: 0}}>
      <XAxis
        type="category"
        dataKey="x"
        interval={0}
        tickLine={{ transform: 'translate(0, -6)' }}
      />
      <YAxis type="number" dataKey="y" height={10} width={80} tick={false} tickLine={false} axisLine={false} label={{ value: 'Frequency', position: 'insideRight' }}/>
      <ZAxis type="number" dataKey="size" domain={domain} range={range} />
      <Scatter data={data} fill='#8884d8'/>
    </ScatterChart>
  );
};

export default TimelineByOpen;