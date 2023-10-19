import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

export function RangeFromDate(startDate: Date, endDate: Date) {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

export const GetWeekName = (dayNumber: number) => {
  return ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][dayNumber];
};

export const GetTermWeek = (term: number) => {
  dayjs.extend(weekOfYear);
  const now = dayjs();
  if (term == 0) {
    return dayjs(`${now.year}-09-01`).week();
  } else if (term == 1) {
    return dayjs(`${now.year}-02-01`).week();
  }
  return 0;
};