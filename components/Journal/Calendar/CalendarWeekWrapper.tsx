import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import { FC, useState } from "react";
import CalendarController from "./CalendarController";
import CalendarWeek from "./CalendarWeek";
import { animationFadeInClassNames } from "@common/app";

interface CalendarWeekWrapper {
  onSwitchCalendarType: () => void;
  onChange: (date: Date) => void;
  currentDate: Date;
}

const CalendarWeekWrapper: FC<CalendarWeekWrapper> = ({
  onSwitchCalendarType,
  onChange,
  currentDate,
}) => {
  dayjs.extend(weekOfYear);
  dayjs.extend(isoWeek);

  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState(dayjs().week());

  const month = new Date(1000 * 60 * 60 * 24 * 7 * selectedWeek).getMonth();

  const prevWeek = () => {
    if (selectedWeek <= 1) {
      setSelectedWeek(52);
      setYear(year - 1);
      return;
    }
    setSelectedWeek(selectedWeek - 1);
  };

  const nextWeek = () => {
    if (selectedWeek >= 52) {
      setSelectedWeek(1);
      setYear(year + 1);
      return;
    }
    setSelectedWeek(selectedWeek + 1);
  };

  return (
    <CalendarController
      onSwitchCalendarType={onSwitchCalendarType}
      onPrev={prevWeek}
      onNext={nextWeek}
      currentDate={currentDate}
      selectedWeek={selectedWeek}
      currentMonth={month}
    >
      <div className={animationFadeInClassNames}>
        <CalendarWeek
          onChange={onChange}
          currentDate={currentDate}
          selectedWeek={selectedWeek}
          currentYear={year}
        ></CalendarWeek>
      </div>
    </CalendarController>
  );
};

export default CalendarWeekWrapper;
