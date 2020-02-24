import axios from 'axios';
import cheerio from 'cheerio';

export default (req, res) => {
  const result = {};
  const years = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"];

  const requestList = years.map((year) => {
    return axios.get(`https://kishojin.weathermap.jp/topics/${year}01sakura.php`);
  });

  axios.all(requestList).then((axiosRes) => {
    axiosRes.forEach((ar, index) => {
      const $ = cheerio.load(ar.data);
      const yearList = [];

      $('table#sakura_table').each((i, e) => {
        const oneYearList = {};
        const areaName = $(e).find('tr.area_name').text();
        const subareaList = [];
        const kaikaList = [];
        const mankaiList = [];
  
        $(e).find('td.kansho_v').each((j, kansho) => {
          subareaList.push($(kansho).text().replace(/[+\-*@]/g, ''));
        });
  
        $(e).find('td.kaika_v').each((j, kaika) => {
          kaikaList.push($(kaika).text());
        });
  
        $(e).find('td.mankai_v').each((j, mankai) => {
          mankaiList.push($(mankai).text());
        });
  
        oneYearList[`area-name`] = areaName;
        oneYearList[`subareas`] = subareaList;
        oneYearList[`open`] = kaikaList;
        oneYearList[`full`] = mankaiList;
        yearList.push(oneYearList);
      });

      result[`${(Number(years[index])-1).toString()}`] = yearList;
    });

    res.json(result);
  });
};
