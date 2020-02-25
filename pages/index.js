import React from 'react';
import axios from 'axios';
import TimelineByOpen from '../components/charts/mark-series/TimelineByOpen';
import Root from '../components/Root';

const IndexPage = (props) => {
  return (
    <Root>
      <TimelineByOpen data={props.data} />
    </Root>
  )
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
