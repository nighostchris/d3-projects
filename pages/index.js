import React from 'react';
import axios from 'axios';
import TimelineByOpen from '../components/charts/mark-series/TimelineByOpen';

const IndexPage = (props) => {
  return <TimelineByOpen data={props.data} />
}

IndexPage.getInitialProps =
  async function() {
    const res = await axios.get('http://localhost:3000/api/get-sakura-history');
    const data = await res.data;

    return {
      data: data
    };
};

export default IndexPage;
