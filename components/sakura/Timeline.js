import React from 'react';
import extendData from '../../utility/extendData';
import extendDate from '../../utility/extendDate';
import compareDate from '../../utility/compareDate';
import TimelineChart from '../charts/scatter/TimelineChart';

let _ = require('lodash');
const years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];

const Timeline = ({ data: fetchData, mode, city }) => {
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

      cityIndex.forEach((city, index) => {
        data.push(fetchData[years[index]][city[0]][mode][city[1]]);
      });

      data = data.map((d) => {
        let [month, day] = d.split("/").map(Number);
        return `${month}/${day}`;
      });

      data.sort((a, b) => compareDate(a, b));

      data = _.countBy(data);

      data = Object.keys(data).map((key) => {
        let [splitMonth, splitDay] = key.split("/").map(Number);
        let size = data[key] > 1 ? data[key] * data[key] : data[key];
        return {x: `${splitMonth}/${splitDay}`, y: 1, size: size};
      });

      data = extendData(extendDate(data[0].x, data[data.length - 1].x), data);
    }
  }

  renderData();

  return (
    <>
    {
      city && (
        <TimelineChart header={`${city}${mode === "open" ? "開花" : "滿開"}歷史`} data={data} />
      )
    }
    </>
  );
};

export default Timeline;
