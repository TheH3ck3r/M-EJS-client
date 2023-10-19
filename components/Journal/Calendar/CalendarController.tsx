import styles from "./CalendarController.module.scss";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { FC } from "react";
import { GetTermWeek } from "@common/AdditionalTimeParsers";
import { ChevronIcon } from "components/icons";

interface CalendarControllerProps {
  onPrev: () => void;
  onNext: () => void;
  currentDate: Date;
  currentYear?: number;
  currentMonth: number;
  selectedWeek: number;
  onSwitchCalendarType: () => void;
  children: React.ReactNode;
}

const CalendarController: FC<CalendarControllerProps> = ({
  onPrev,
  onNext,
  onSwitchCalendarType,
  currentDate,
  currentMonth,
  children,
}) => {
  dayjs.extend(weekOfYear);

  return (
    <div className={styles.Calendar}>
      <div className={styles.CalendarHeader}>
        <div className={styles.ChevronButton} onClick={onPrev}>
          <ChevronIcon style={{ transform: "rotate(90deg)" }}></ChevronIcon>
        </div>

        <div className="CalendarDate" onClick={() => onSwitchCalendarType()}>
          {dayjs(`${currentDate.getFullYear()}-${currentMonth + 1}-01`)
            .locale("ru")
            .format("MMMM YYYY г.")}
          <br />
          <span>
            выбрана {dayjs(currentDate).week() - GetTermWeek(1)} неделя
          </span>
        </div>

        <div className={styles.ChevronButton} onClick={onNext}>
          <ChevronIcon style={{ transform: "rotate(270deg)" }}></ChevronIcon>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default CalendarController;
