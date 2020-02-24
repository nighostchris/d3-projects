const compareDate = (a, b) => {
  const [firstMonth, firstDay] = a.split("/").map(Number);
  const [secondMonth, secondDay] = b.split("/").map(Number);

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
