import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend } from 'recharts';
import extendDate from '../../../utility/extendDate';
import compareDate from '../../../utility/compareDate';

let _ = require('lodash');

const years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];

const TimelineByOpen = (props) => {
  let openList = [];
  const subareasList = [];
  const extendedData = [];

  years.forEach((year) => {
    openList.push(props.data[year][0]["open"][0]);
  });

  props.data["2010"][0]["subareas"].forEach((subarea) => {
    subareasList.push(subarea);
  })

  openList = _.countBy(openList);

  const data = Object.keys(openList).map((key) => {
    let size = openList[key] > 1 ? openList[key] * openList[key] : openList[key];
    return {x: key, y: 1, size: size};
  });

  data.sort((a, b) => compareDate(a.x, b.x));
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
      <h3>{`${subareasList[0]}`}</h3>
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
