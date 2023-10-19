import { Badge, Text } from "@adev/ui-kit";
import PageWithoutNavigation from "components/Page/PageWithUpperNavigation";
import styles from "./About.module.scss";
import { AdevFullIcon } from "components/icons";
import { kAppVersion } from "@common/app";
import clsx from "clsx";

const About = () => {
  return (
    <PageWithoutNavigation
      style={{ padding: "0em" }}
      noContainer
      label="О приложении"
    >
      <div
        className={clsx(
          styles.about,
          "animate__animated animate__slideInLeft animate__faster"
        )}
      >
        <div className={styles.header}>
          <Text typography="headline-md" style={{ marginTop: 0 }}>
            Электронный журнал
          </Text>
          <Badge style={{ backgroundColor: "#FF5E00", height: "24px" }}>
            Beta
          </Badge>
        </div>
        <AdevFullIcon></AdevFullIcon>
        <div className={styles.section}>
          <Text>
            Электронный журнал РТУ МИРЭА, разработанный студентами 1 курса из
            команды ADEV, совместно с ответственным по работе со студентами
            Ярославом Акатьевым и директором техноковоркинга Максимом Макущенко
          </Text>
        </div>
        <div className={styles.section}>
          <Text>
            Разработка сервиса началсь 26 сентября 2022 года. После показа MVP и
            получения одобрения от Акатьева Ярослава 17 октября 2022 года мы
            начали полноценную разработку совместно с Максимом Макущенко. На
            данный момент сервис находится в стадии закрытого бета тестирования.
          </Text>
        </div>

        <Text typography="headline-xs">Версия {kAppVersion()}</Text>
      </div>
    </PageWithoutNavigation>
  );
};

export default About;
