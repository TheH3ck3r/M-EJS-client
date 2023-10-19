import Journal from "./Journal";
import Page from "../Page";
import { useState } from "react";
import Calendar from "./Calendar";

const IndexPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  return (
    <Page label="Журнал">
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Calendar
          currentDate={currentDate}
          onChange={(date) => setCurrentDate(date)}
        />
        <Journal date={currentDate}></Journal>
      </div>
    </Page>
  );
};

export default IndexPage;
