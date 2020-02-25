const monthDayMap = {1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30};

const extendDate = (a, b) => {
  const expandedTimeline = [a];
  let [startMonth, startDay] = a.split("/").map(Number);
  let [endMonth, endDay] = b.split("/").map(Number);
  while (startMonth < endMonth) {
    if (monthDayMap[startMonth] === startDay) {
      startMonth += 1;
      startDay = 1;
    } else {
      startDay += 1;
    }
    expandedTimeline.push(`${startMonth}/${startDay}`);
  }
  
  while (startDay < endDay) {
    startDay += 1;
    expandedTimeline.push(`${startMonth}/${startDay}`);
  }
  
  return expandedTimeline;
};

export default extendDate;
