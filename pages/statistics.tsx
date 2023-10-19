const Statistics = dynamic(() => import("components/Statistics/Statistics"), {
  ssr: false,
});
import { NextPage } from "next";
import dynamic from "next/dynamic";

const StatisticsPage: NextPage = () => {
  return <Statistics></Statistics>;
};

export default StatisticsPage;
