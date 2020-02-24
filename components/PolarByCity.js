import { Polar } from 'react-chartjs-2';

const years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018"];

const PolarByCity = (props) => {
  const test = [];
  const process = props.data;
  years.forEach((year) => {
    test.push(props.data[year][0]["open"][0]);
  });
  console.log(test);

  return (
    <div></div>
    //<Polar data={} />
  );
};



export default PolarByCity;