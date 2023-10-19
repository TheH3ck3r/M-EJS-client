const Settings = dynamic(() => import("components/Settings/Settings"), {
  ssr: false,
});
import { NextPage } from "next";
import dynamic from "next/dynamic";

const SettingsPage: NextPage = () => {
  return <Settings></Settings>;
};

export default SettingsPage;
