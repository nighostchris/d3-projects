import React from 'react';
import axios from 'axios';
import Root from '../components/Root';
import compareDate from '../utility/compareDate';
import TimelineByOpen from '../components/charts/mark-series/TimelineByOpen';

const SakuraPage = (props) => {
  let _ = require('lodash');
  let openList = [];
  const subareasList = [];
  const years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];

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

  return (
    <Root>
      <TimelineByOpen data={data} />
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
