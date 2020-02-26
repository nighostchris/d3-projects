const compareDate = (a, b) => {
  let [firstMonth, firstDay] = a.split("/").map(Number);
  let [secondMonth, secondDay] = b.split("/").map(Number);

  if (firstMonth === 12) { firstMonth -= 12; }
  if (secondMonth === 12) { secondMonth -= 12; }

  if (firstMonth > secondMonth) {
    return 1;
  } else if (firstMonth < secondMonth) {
    return -1;
  } else {
    if (firstDay > secondDay) {
      return 1;
    } else {
      return -1;
    }
  }
};

export default compareDate;
