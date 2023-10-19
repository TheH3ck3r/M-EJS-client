import dayjs from "dayjs";
import "dayjs/locale/ru";
import weekday from "dayjs/plugin/weekday";
import { FC, useEffect, useState } from "react";
import styles from "./CalendarWeek.module.scss";
import { GetWeekName, RangeFromDate } from "@common/AdditionalTimeParsers";
import clsx from "clsx";

interface CalendarWeekProps {
  currentDate: Date;
  selectedWeek: number;
  currentYear: number;
  onChange: (date: Date) => void;
}

const getDateByWeek = (week: number, year: number) => {
  const day = 1 + (week - 1) * 7;
  return new Date(year, 0, day);
};

const CalendarWeek: FC<CalendarWeekProps> = ({
  onChange,
  currentDate,
  selectedWeek,
}) => {
  dayjs.extend(weekday);

  const [week, setWeek] = useState<Array<Date>>([]);

  useEffect(() => {
    const monday = dayjs(
      getDateByWeek(selectedWeek, new Date().getFullYear())
    ).weekday(1);
    const sunday = dayjs(
      getDateByWeek(selectedWeek, new Date().getFullYear())
    ).weekday(7);

    setWeek(RangeFromDate(monday.toDate(), sunday.toDate()));
  }, [selectedWeek]);

  const isToday = (dist: Date) => {
    const now = dayjs();

    return (
      now.date() == dist.getDate() &&
      now.month() == dist.getMonth() &&
      now.year() == dist.getFullYear()
    );
  };

  return (
    <div className={styles.WeekDays}>
      {week.map((date, index) => (
        <div
          key={index}
          className={clsx(
            styles.WeekDaysItem,
            date.getDay() == 0 && styles.WeekDaysItemDisabledHeader
          )}
          onClick={() => onChange(date)}
        >
          <div className={styles.WeekDaysItemDateTitle}>
            {GetWeekName(date.getDay())}
          </div>
          <div
            className={clsx(
              styles.WeekDaysItemDateNumber,
              date.getDay() != 0 &&
                dayjs(date).isSame(dayjs(currentDate), "day") &&
                styles.WeekDaysItemSelected,
              isToday(date) && styles.WeekDaysItemToday,
              date.getDay() == 0 && styles.WeekDaysItemDisabled
            )}
          >
            {date.getDate()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarWeek;
