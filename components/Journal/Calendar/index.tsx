import { FC, useState } from "react";
import CalendarMonthWrapper from "./CalendarMonthWrapper";
import CalendarWeekWrapper from "./CalendarWeekWrapper";
import styles from "./Base.module.scss";
import clsx from "clsx";
import { animationFadeInClassNames } from "@common/app";

enum CalendarViewType {
  kWeek,
  kMonth,
}

interface CalendarProps {
  onChange: (date: Date) => void;
  currentDate: Date;
}

const Calendar: FC<CalendarProps> = ({ onChange, currentDate }) => {
  const [calendarType, setCalendarType] = useState(CalendarViewType.kWeek);

  const calendarComponent = (calendarType: CalendarViewType) => {
    if (calendarType == CalendarViewType.kWeek) {
      return (
        <CalendarWeekWrapper
          currentDate={currentDate}
          onChange={onChange}
          onSwitchCalendarType={() => setCalendarType(Number(!calendarType))}
        />
      );
    } else if (calendarType == CalendarViewType.kMonth) {
      return (
        <CalendarMonthWrapper
          onSwitchCalendarType={() => setCalendarType(Number(!calendarType))}
          onChange={onChange}
          currentDate={currentDate}
        />
      );
    }
  };

  return (
    <div className={clsx(styles.base, animationFadeInClassNames)}>
      {calendarComponent(calendarType)}
    </div>
  );
};

export default Calendar;
