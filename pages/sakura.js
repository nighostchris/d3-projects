import React from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import Root from '../components/Root';
import Select from '../components/global/Select';
import Timeline from '../components/sakura/Timeline';
import StackedTimeline from '../components/sakura/StackedTimeline';

const subareaList = ["札幌", "稚内", "旭川", "網走", "根室", "釧路", "帯広", "室蘭", "函館", "青森"
  , "秋田", "盛岡", "仙台", "山形", "福島", "水戸", "宇都宮", "前橋", "熊谷", "東京", "銚子", "横浜", "長野", "甲府",
  "静岡", "名古屋", "岐阜", "津", "新潟", "富山", "金沢", "輪島", "福井", "彦根", "京都", "舞鶴", "大阪", "神戸", "奈良", "和歌山",
  "岡山", "広島", "松江", "鳥取", "高松", "徳島", "松山", "高知", "下関", "福岡", "大分", "長崎", "佐賀", "熊本",
  "宮崎", "鹿児島", "名瀬", "那覇", "南大東島", "宮古島", "石垣島"];

const SakuraPage = (props) => {
  const [subareaSelected, setSubareaSelected] = React.useState([]);

  return (
    <Root>
      <div style={{ width: '100%', padding: '0px 50px', backgroundImage: 'linear-gradient(90deg, #ffe6eb, #ffb7c5)'}}>
        <Row className="mx-0">
          <div className="col-xl-12">
            <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: '#4e73df' }} className="mt-4 mb-0">Sakura Period Analysis</h2>
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
      <div className="col-xl-12" style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
        { subareaSelected !== [] && (
            <>
              <Timeline data={props.data} mode="open" city={subareaSelected[0]} />
              <Timeline data={props.data} mode="full" city={subareaSelected[0]} />
              <StackedTimeline data={props.data} city={subareaSelected[0]} />
            </>
          )
        }
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
