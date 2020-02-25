import React from 'react';
import axios from 'axios';
import Root from '../components/Root';
import extendData from '../utility/extendData';
import extendDate from '../utility/extendDate';
import compareDate from '../utility/compareDate';
import TimelineChart from '../components/charts/scatter/TimelineChart';
import StackedTimelineChart from '../components/charts/area/StackedTimelineChart';

const SakuraPage = (props) => {
  let _ = require('lodash');
  let openList = [];
  let fullList = [];
  const subareasList = [];
  const years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];

  years.forEach((year) => {
    openList.push(props.data[year][0]["open"][0]);
    fullList.push(props.data[year][0]["full"][0]);
  });

  props.data["2010"][0]["subareas"].forEach((subarea) => {
    subareasList.push(subarea);
  })

  openList = _.countBy(openList);
  fullList = _.countBy(fullList);

  const openData = Object.keys(openList).map((key) => {
    let [splitMonth, splitDay] = key.split("/").map(Number);
    let size = openList[key] > 1 ? openList[key] * openList[key] : openList[key];
    return {x: `${splitMonth}/${splitDay}`, y: 1, size: size};
  });

  const fullData = Object.keys(fullList).map((key) => {
    let [splitMonth, splitDay] = key.split("/").map(Number);
    let size = fullList[key] > 1 ? fullList[key] * fullList[key] : fullList[key];
    return {x: `${splitMonth}/${splitDay}`, y: 1, size: size};
  });

  openData.sort((a, b) => compareDate(a.x, b.x));
  fullData.sort((a, b) => compareDate(a.x, b.x));

  const stackedData = [
    {x: '4/11', "2010": 1, "2011": 1, "2012": 0},
    {x: '4/12', "2010": 1, "2011": 1, "2012": 1},
    {x: '4/13', "2010": 0, "2011": 1, "2012": 1},
  ];

  return (
    <Root>
      <TimelineChart data={extendData(extendDate(openData[0].x, openData[openData.length - 1].x), openData)} />
      <TimelineChart data={extendData(extendDate(fullData[0].x, fullData[fullData.length - 1].x), fullData)} />
      <StackedTimelineChart data={stackedData} />
    </Root>
  )
}

SakuraPage.getInitialProps =
  async function() {
    const res = await axios.get('http://localhost:3000/api/get-sakura-history');
    const data = await res.data;

    return {
      data: data
    };
};

export default SakuraPage;
