import { getCookie } from "cookies-next";
import { createContext, useContext } from "react";

export enum Themes {
  kSystem,
  kLight,
  kDark,
}

export const ThemeView = (theme: Themes) => {
  return ["theme-system", "theme-light", "theme-dark"][theme];
};

export const ThemeCookieView = (theme: Themes) => {
  return ["system", "light", "dark"][theme];
};

export const ThemeDetect = (theme: string): Themes => {
  const themes = new Map([
    ["theme-system", Themes.kSystem],
    ["theme-light", Themes.kLight],
    ["theme-dark", Themes.kDark],
  ]);

  return themes.get(theme) ?? Themes.kSystem;
};

export const ThemeCookieDetect = (theme: string): Themes => {
  const themes = new Map([
    ["system", Themes.kSystem],
    ["light", Themes.kLight],
    ["dark", Themes.kDark],
  ]);

  return themes.get(theme) ?? Themes.kSystem;
};

export interface IAppContext {
  theme: Themes;
  changeTheme?: (theme: Themes) => void;
}

const AppContextDefaultValue = {
  theme: ThemeCookieDetect(getCookie("theme")?.toString()!),
};

export const AppContext = createContext<IAppContext>(AppContextDefaultValue);

export const useAppContext = () => useContext(AppContext);
