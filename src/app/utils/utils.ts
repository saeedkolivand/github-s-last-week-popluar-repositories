export const getLastWeekDate = () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  // console.log("today:", today); // today: Thu Jul 07 2022 16:22:42 GMT+0430 (Iran Daylight Time)
  // console.log("today.getFullYear():", today.getFullYear()); // 2022
  // console.log("today.getMonth():", today.getMonth()); // 6
  // console.log("today.getDate():", today.getDate()); // 7
  // console.log("lastWeek", lastWeek); // Thu Jun 30 2022 00:00:00 GMT+0430 (Iran Daylight Time)

  const lastWeekMonth = lastWeek.getMonth() + 1; // 6
  const lastWeekDay = lastWeek.getDate(); // 30
  const lastWeekYear = lastWeek.getFullYear(); // 2022

  // console.log(`${lastWeekYear}-${lastWeekMonth}-${lastWeekDay}`); // 2022-6-30

  return `${`0000${lastWeekYear.toString()}`.slice(
    -4
  )}-${`00${lastWeekMonth.toString()}`.slice(
    -2
  )}-${`00${lastWeekDay.toString()}`.slice(-2)}`;
};
