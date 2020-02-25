import React from 'react';
import axios from 'axios';
import Root from '../components/Root';
import extendDate from '../utility/extendDate';
import compareDate from '../utility/compareDate';
import Timeline from '../components/sakura/Timeline';
import TimelineChart from '../components/charts/scatter/TimelineChart';
import StackedTimelineChart from '../components/charts/area/StackedTimelineChart';

const SakuraPage = (props) => {
  const stackedTimelineList = [];
  const minList = [];
  const maxList = [];
  const subareasList = [];
  const years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];

  years.forEach((year) => {
    let extendedDate = extendDate(props.data[year][0]["open"][0], props.data[year][0]["full"][0])
    extendedDate.sort((a, b) => compareDate(a, b));
    stackedTimelineList.push(extendedDate);
    minList.push(extendedDate[0]);
    maxList.push(extendedDate[extendedDate.length - 1]);
  });

  props.data["2010"][0]["subareas"].forEach((subarea) => {
    subareasList.push(subarea);
  })

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

  return (
    <Root>
      <Timeline data={props.data} mode="open" city="高知" />
      {/* <StackedTimelineChart data={stackData} /> */}
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
