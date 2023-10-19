import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { AppContext, ThemeView, ThemeCookieDetect } from "./AppContext";

interface AppProps {
  children: React.ReactNode;
}

export const App = ({ children }: AppProps) => {
  const [theme, setTheme] = useState(
    ThemeCookieDetect(getCookie("theme")?.toString()!)
  );
  useEffect(() => {
    document.body.classList.value = "";
    document.body.classList.add(ThemeView(theme));
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        theme: theme,
        changeTheme: setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
