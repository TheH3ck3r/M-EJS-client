import { AdevIcon } from "components/icons";
import { Island, Text } from "@adev/ui-kit";
import styles from "./AuthPage.module.scss";
import { Config, Connect } from "@vkontakte/superappkit";
import { useEffect, useRef } from "react";
import Router from "next/router";

const vkIdConfigInit = () => {
  Config.init({
    appId: 51530224,

    appSettings: {
      agreements: "",
      promo: "",
      vkc_behavior: "",
      vkc_auth_action: "",
      vkc_brand: "",
      vkc_display_mode: "",
    },
  });
};

export default function AuthPage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    vkIdConfigInit();
  }, []);
  const redirectAuthHandler = () =>
    Connect.redirectAuth({
      url: "https://mejs.ru/auth",
      state: "",
      source: "",
      action: undefined,
      screen: undefined,
    });
  const { payload } = Router.query;
  useEffect(() => {
    if (payload) {
      const data = JSON.parse(payload.toString());
      window.localStorage.setItem("VkId", data.user.id);
      Router.replace("/");
    }
  }, [payload]);
  return (
    <div className={styles.main}>
      <Island className={styles.island}>
        <AdevIcon></AdevIcon>
        <div>
          <Text as="h1" typography="control-xxl" align="center">
            Авторизуйтесь, чтобы продолжить
          </Text>
          <div onClick={redirectAuthHandler} className={styles.button}>
            Войти через ВКонтакте
          </div>
        </div>
      </Island>
    </div>
  );
}
