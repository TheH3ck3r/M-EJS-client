import dayjs from "dayjs";
import { FC, useState } from "react";
import CalendarController from "./CalendarController";
import CalendarMonth from "./CalendarMonth";
import { animationFadeInClassNames, animationFadeInDownClassNames } from "@common/app";

interface CalendarMonthWrapperProps {
  onSwitchCalendarType: () => void;
  onChange: (date: Date) => void;
  currentDate: Date;
}

const CalendarMonthWrapper: FC<CalendarMonthWrapperProps> = ({
  onSwitchCalendarType,
  onChange,
  currentDate,
}) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const prevMonth = () => {
    if (month - 1 < 0) {
      setYear(year - 1);
      setMonth(11);
      return;
    }

    setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month + 1 >= 11) {
      setYear(year + 1);
      setMonth(0);
      return;
    }

    setMonth(month + 1);
  };

  return (
    <>
      <CalendarController
        onPrev={prevMonth}
        onNext={nextMonth}
        currentMonth={month}
        currentYear={year}
        selectedWeek={dayjs().week()}
        onSwitchCalendarType={onSwitchCalendarType}
        currentDate={currentDate}
      >
        <div className={animationFadeInClassNames}>
          <CalendarMonth
            onChange={onChange}
            currentDate={currentDate}
            currentMonth={month}
            currentYear={year}
          ></CalendarMonth>
        </div>
      </CalendarController>
    </>
  );
};

export default CalendarMonthWrapper;
