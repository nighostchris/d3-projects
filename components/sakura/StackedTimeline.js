import React from 'react';
import extendDate from '../../utility/extendDate';
import compareDate from '../../utility/compareDate';
import StackedTimelineChart from '../charts/area/StackedTimelineChart';

let _ = require('lodash');
const years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];

const StackedTimeline = ({ data: fetchData, city }) => {
  let data = [];

  const findCityIndex = (cityname) => {
    let result = [];

    years.forEach((year) => {
      let found = false;

      fetchData[year].forEach((area, a_index) => {
        if (found) { return false; }
  
        area["subareas"].forEach((subarea, sa_index) => {
          if (subarea === cityname) {
            found = true;
            result.push([a_index, sa_index]);
            return false;
          }
        });
      });
    });

    return result;
  }

  const renderData = () => {
    if (city) {
      const cityIndex = findCityIndex(city);

      const minList = [];
      const maxList = [];
      const stackedTimelineList = [];

      cityIndex.forEach((city, index) => {
        let extendedDate = extendDate(fetchData[years[index]][city[0]]["open"][city[1]],
          fetchData[years[index]][city[0]]["full"][city[1]]);

        extendedDate.sort((a, b) => compareDate(a, b));
        stackedTimelineList.push(extendedDate);
        minList.push(extendedDate[0]);
        maxList.push(extendedDate[extendedDate.length - 1]);
      });

      minList.sort((a, b) => compareDate(a, b));
      maxList.sort((a, b) => compareDate(a, b));
      extendDate(minList[0], maxList[maxList.length - 1]).forEach((date) => {
        let temp = {};
        years.forEach((year, index) => {
          if (stackedTimelineList.length > index) {
            if (stackedTimelineList[index].includes(date)) {
              temp[`${year}`] = 1;
            } else {
              temp[`${year}`] = 0;
            }
          } else {
            temp[`${year}`] = 0;
          }
        });
        temp["x"] = date;
        data.push(temp);
      });
    }
  }

  renderData();

  return (
    <>
    {
      city && (
        <StackedTimelineChart header={`${city}開花至滿開歷史`} data={data} />
      )
    }
    </>
  );
};

export default StackedTimeline;
