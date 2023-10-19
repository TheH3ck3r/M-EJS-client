import PageWithUpperNavigation from "components/Page/PageWithUpperNavigation";
import { Text, BottomDrawer, Switch } from "@adev/ui-kit";
import React, { useContext, useState } from "react";
import SettingsItem from "./SettingsItem";
import styles from "./Settings.module.scss";
import Link from "next/link";
import { EqualizerIcon, GroupIcon, InfoIcon } from "components/icons";
import { kAppVersion } from "@common/app";
import AgreementsApp from "./AgreementsApp";
import { AppContext, ThemeCookieView, Themes } from "components/App/AppContext";
import { setCookie } from "cookies-next";
import ApperanceView from "./ApperanceView";

enum pages {
  kNone,
  kNotifications,
  kAgreements,
}

const settingsRoute = (page: pages) => {
  const router = [
    <></>,
    <>Уведомления в данных момент находятся в стадии активной разработки</>,
    <AgreementsApp key={pages.kAgreements} />,
  ];
  return router[page];
};

const Setting = () => {
  const { theme, changeTheme } = useContext(AppContext);
  const [currentTheme, setCurrentTheme] = useState(theme);
  console.log(currentTheme);

  const [statistics, setStatistics] = useState(true);
  const [currentPage, setCurrentPage] = useState(pages.kNone);

  const setTheme = (theme: Themes) => {
    console.log(theme);
    setCookie("theme", ThemeCookieView(theme));
    setCurrentTheme(theme);
    changeTheme?.(theme);
  };

  return (
    <>
      <PageWithUpperNavigation
        label="Настройки"
        noContainer
        style={{ padding: "4rem 0 0 0" }}
      >
        <div className="animate__animated animate__slideInLeft animate__faster">
          <div className={styles.category}>
            <Text
              typography="headline-md"
              style={{ marginBottom: "1rem", marginTop: 0, marginLeft: "1rem" }}
              weight="bold"
            >
              Другие
            </Text>

            <SettingsItem
              onClick={() => setStatistics(!statistics)}
              rightAdditional={
                <Switch
                  color="var(--ep-color-primary)"
                  checked={statistics}
                ></Switch>
              }
              label="Cбор статистики"
              icon={<EqualizerIcon></EqualizerIcon>}
            ></SettingsItem>

            <Link href="/settings/about">
              <SettingsItem
                label="О приложении"
                rightAdditional={<>Версия {kAppVersion()}</>}
                icon={<InfoIcon></InfoIcon>}
              ></SettingsItem>
            </Link>
          </div>

          <div className={styles.category}>
            <Text
              typography="headline-md"
              style={{ marginBottom: "1rem", marginTop: 0, marginLeft: "1rem" }}
              weight="bold"
            >
              Тема оформления
            </Text>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "100%",
                placeItems: "center",
              }}
            >
              <ApperanceView
                view="light"
                checked={currentTheme == Themes.kLight}
                onChange={() => setTheme(Themes.kLight)}
              ></ApperanceView>
              <ApperanceView
                view="dark"
                checked={currentTheme == Themes.kDark}
                onChange={() => setTheme(Themes.kDark)}
              ></ApperanceView>
              <ApperanceView
                view="system"
                checked={currentTheme == Themes.kSystem}
                onChange={() => setTheme(Themes.kSystem)}
              ></ApperanceView>
            </div>
          </div>
        </div>

        <div className={styles.category}>
          <span style={{ color: "var(--ep-color-primary)" }}>
            <Link href="/auth?retpath=https://id.adev.su/settings">
              <SettingsItem
                label="Сменить пользователя"
                icon={<GroupIcon></GroupIcon>}
              ></SettingsItem>
            </Link>
          </span>
        </div>
      </PageWithUpperNavigation>

      <BottomDrawer
        open={currentPage != pages.kNone}
        onClose={() => setCurrentPage(pages.kNone)}
      >
        {settingsRoute(currentPage)}
      </BottomDrawer>
    </>
  );
};
export default Setting;
