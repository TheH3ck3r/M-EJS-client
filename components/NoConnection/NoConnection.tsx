import { Island, Text } from "@adev/ui-kit";
import { NoConnectionIcon } from "components/icons";
import styles from "./NoConnection.module.scss";

export default function NoConnection() {
  return (
    <Island style={{ padding: "1em" }}>
      <div className={styles.NoConnection}>
        <NoConnectionIcon></NoConnectionIcon>
        <Text typography="display-md" weight="bold">
          Хьюстон, у вас проблемы с соединением.
        </Text>
        <Text weight="regular">Проверьте мобильный интернет или Wi-Fi.</Text>
      </div>
    </Island>
  );
}
