import { Container, Text } from "@adev/ui-kit";
import { FC } from "react";
import BottomNavigation from "../BottomNavigation/BottomNavigation";
import styles from "./Page.module.scss";
import {
  CertificateIcon,
  CertificateStrokeIcon,
  JournalIcon,
  JournalStrokeIcon,
  SettingsIcon,
  SettingsStrokeIcon,
  StatisticIcon,
  StatisticStrokeIcon,
} from "components/icons";

export interface PageProps {
  label?: string;
  noContainer?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Page: FC<PageProps> = ({ label, children, style }) => {
  const items = [
    {
      icon: <CertificateStrokeIcon></CertificateStrokeIcon>,
      iconSelected: <CertificateIcon></CertificateIcon>,
      title: "Документы",
      link: "/certificates",
    },
    {
      icon: <JournalStrokeIcon></JournalStrokeIcon>,
      iconSelected: <JournalIcon></JournalIcon>,
      title: "Журнал",
      link: "/",
    },
    {
      icon: <StatisticStrokeIcon></StatisticStrokeIcon>,
      iconSelected: <StatisticIcon></StatisticIcon>,
      title: "Статистика",
      link: "/statistics",
    },
    {
      icon: <SettingsStrokeIcon></SettingsStrokeIcon>,
      iconSelected: <SettingsIcon></SettingsIcon>,
      title: "Настройки",
      link: `/settings`,
    },
  ];

  return (
    <main className={styles.Page} style={style}>
      <Container>
        <Text typography="headline-md" weight="bold" as="h1">
          {label}
        </Text>
        {children}
        <div className={styles.BottomNavigation}>
          <BottomNavigation items={items}></BottomNavigation>
        </div>
      </Container>
    </main>
  );
};

export default Page;
