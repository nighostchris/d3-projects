const extendData = (dateList, data) => {
  const extendedData = [];

  dateList.map((date) => {
    let existed = false;
    data.forEach((d) => {
      if (date === d.x) {
        extendedData.push({x: d.x, y: 1, size: d.size});
        existed = true;
        return false;
      }
    });
    if (!existed) {
      extendedData.push({x: date, y: 1, size: 0});
    }
  });

  return extendedData;
};

export default extendData;
