import React from 'react';
import axios from 'axios';
import PolarByCity from '../components/PolarByCity';

const IndexPage = (props) => {
  return <PolarByCity data={props.data} />
}

IndexPage.getInitialProps =
  async function() {
    const res = await axios.get('http://localhost:3000/api/get-sakura-history');
    const data = await res.data

    console.log(data);
    return {
      data: data
    };
};

export default IndexPage;
