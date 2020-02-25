import React from 'react';
import axios from 'axios';
import Root from '../components/Root';
import extendDate from '../utility/extendDate';
import compareDate from '../utility/compareDate';
import Timeline from '../components/sakura/Timeline';
import TimelineChart from '../components/charts/scatter/TimelineChart';
import StackedTimelineChart from '../components/charts/area/StackedTimelineChart';
import Select from '../components/global/Select';
import { Row } from 'react-bootstrap';

const subareaList = ["札幌", "稚内", "旭川", "網走", "根室", "釧路", "帯広", "室蘭", "函館", "青森"
  , "秋田", "盛岡", "仙台", "山形", "福島", "水戸", "宇都宮", "前橋", "熊谷", "東京", "銚子", "横浜", "長野", "甲府",
  "静岡", "名古屋", "岐阜", "津", "新潟", "富山", "金沢", "輪島", "福井", "彦根", "京都", "舞鶴", "大阪", "神戸", "奈良", "和歌山",
  "岡山", "広島", "松江", "鳥取", "高松", "徳島", "松山", "高知", "下関", "福岡", "大分", "長崎", "佐賀", "熊本",
  "宮崎", "鹿児島", "名瀬", "那覇", "南大東島", "宮古島", "石垣島"];

const SakuraPage = (props) => {
  const [subareaSelected, setSubareaSelected] = React.useState([]);

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
      {/* <StackedTimelineChart data={stackData} /> */}
      <div style={{ width: '100%', padding: '0px 50px', backgroundImage: 'linear-gradient(90deg, #ffe6eb, #ffb7c5)'}}>
        <Row className="mx-0">
          <div className="col-xl-12">
            <h2 style={{ textAlign: 'center' }} className="mt-4 mb-0">Sakura Period Analysis</h2>
          </div>
          <div className="col-xl-3 m-4">
            <Select
              placeholder="Choose a subarea..."
              options={subareaList}
              selected={subareaSelected}
              setSelected={setSubareaSelected}
            />
          </div>
        </Row>
      </div>
      <div className="col-xl-10" style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
        { subareaSelected !== [] && <Timeline data={props.data} mode="open" city={subareaSelected[0]} /> }
        { subareaSelected !== [] && <Timeline data={props.data} mode="full" city={subareaSelected[0]} /> }
      </div>
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
