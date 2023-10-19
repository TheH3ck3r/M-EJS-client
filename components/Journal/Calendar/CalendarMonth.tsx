import _ from "lodash";
import "dayjs/locale/ru";
import { FC } from "react";
import styles from "./CalendarMonth.module.scss";
import { Calendar } from "@adev/ui-kit";

interface CalendarMonthProps {
  currentYear: number;
  currentMonth: number;
  currentDate: Date;
  onChange: (date: Date) => void;
}

const CalendarMonth: FC<CalendarMonthProps> = ({
  currentYear,
  currentMonth,
  onChange,
  currentDate,
}) => {
  return (
    <>
      <Calendar
        disabledWeekDays={[0]}
        classNameDay={styles.day}
        isHeaderVisible={false}
        currentYear={currentYear}
        currentMonth={currentMonth}
        onChange={(date: Array<Date>) => onChange(date[0])}
        defaultValue={[currentDate ?? new Date()]}
      />
    </>
  );
};

export default CalendarMonth;
