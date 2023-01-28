import { createContext, useContext, useEffect, useState } from "react";

const themMode = createContext(null);
const themModeDispath = createContext(null);

const ThemeMode = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const Data = JSON.parse(localStorage.getItem("theme")) || "dark";
    setTheme(Data);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  return (
    <themMode.Provider value={theme}>
      <themModeDispath.Provider value={setTheme}>
        {children}
      </themModeDispath.Provider>
    </themMode.Provider>
  );
};
export const useTheme = () => useContext(themMode);
export const useThemeActions = () => useContext(themModeDispath);
export default ThemeMode;
