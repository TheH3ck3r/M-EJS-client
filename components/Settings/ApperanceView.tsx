import { Checkbox, Skeleton } from "@adev/ui-kit";
import clsx from "clsx";
import { Themes } from "components/App/AppContext";
import { range } from "lodash";
import { FC } from "react";
import styles from "./ApperanceView.module.scss";

type ApperanceViewProps = {
  view: "system" | "dark" | "light";
  checked: boolean;
  onChange: () => void;
};

const ApperanceView: FC<ApperanceViewProps> = ({ view, checked, onChange }) => {
  interface ApperanceProps {
    icon: string;
    label: string;
  }

  const apperance = new Map<string, ApperanceProps>([
    [
      "system",
      {
        icon: "https://res.cloudinary.com/dixvycrtj/image/upload/v1680519103/system_theme_v3rspn.svg",
        label: "Системная",
      },
    ],
    [
      "dark",
      {
        icon: "https://res.cloudinary.com/dixvycrtj/image/upload/v1680519057/dark_theme_gtcfdr.svg",
        label: "Темная",
      },
    ],
    [
      "light",
      {
        icon: "https://res.cloudinary.com/dixvycrtj/image/upload/v1680519016/light_theme_nh4lcr.svg",
        label: "Светлая",
      },
    ],
  ]);

  const currentApperance = apperance.get(view);

  const check = () => {
    onChange();
  };

  return (
    <div className={styles.card} onClick={check}>
      <img src={currentApperance?.icon} alt={currentApperance?.label} />

      <div>{currentApperance?.label}</div>

      <Checkbox
        checkboxFakeClassName={styles.checkbox}
        checked={checked}
      ></Checkbox>
    </div>
  );
};

export default ApperanceView;
