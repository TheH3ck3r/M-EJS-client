import { FC } from "react";
import styles from "./SettingsItem.module.scss";
import { Text } from "@adev/ui-kit";

interface SettingsItemProps {
  label: string;
  additionalText?: string;
  rightAdditional?: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}

const SettingsItem: FC<SettingsItemProps> = ({
  label,
  icon,
  onClick,
  additionalText,
  rightAdditional,
}) => {
  return (
    <div onClick={onClick} className={styles.item}>
      <div className={styles.icon}>{icon}</div>

      <div className={styles.info}>
        <span className={styles.infoMain}>
          <Text typography="headline-sm" color="currentColor">
            {label}
          </Text>

          {rightAdditional}
        </span>

        <span>{additionalText}</span>
      </div>
    </div>
  );
};

export default SettingsItem;
