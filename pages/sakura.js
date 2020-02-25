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
  const stackedTimelineList = [];
  const minList = [];
  const maxList = [];
  const subareasList = [];
  const years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];

  years.forEach((year) => {
    openList.push(props.data[year][0]["open"][0]);
    fullList.push(props.data[year][0]["full"][0]);
    let extendedDate = extendDate(props.data[year][0]["open"][0], props.data[year][0]["full"][0])
    extendedDate.sort((a, b) => compareDate(a, b));
    stackedTimelineList.push(extendedDate);
    minList.push(extendedDate[0]);
    maxList.push(extendedDate[extendedDate.length - 1]);
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

  const stackData = [];

  minList.sort((a, b) => compareDate(a, b));
  maxList.sort((a, b) => compareDate(a, b));
  extendDate(minList[0], maxList[maxList.length - 1]).forEach((date) => {
    let temp = {};
    years.forEach((year, index) => {
      if (stackedTimelineList[index].includes(date)) {
        temp[`${year}`] = 1;
      } else {
        temp[`${year}`] = 0;
      }
    });
    temp["x"] = date;
    stackData.push(temp);
  });

  console.log(stackData);

  return (
    <Root>
      <TimelineChart data={extendData(extendDate(openData[0].x, openData[openData.length - 1].x), openData)} />
      <TimelineChart data={extendData(extendDate(fullData[0].x, fullData[fullData.length - 1].x), fullData)} />
      <StackedTimelineChart data={stackData} />
    </Root>
  )
}

SakuraPage.getInitialProps =
  async function() {
    const res = await axios.get('https://data-visualization-ideas.now.sh/api/get-sakura-history');
    const data = await res.data;

    return {
      data: data
    };
};

export default SakuraPage;
