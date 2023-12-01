import { createContext, useState } from "react";

const AppSettingsContext = createContext();
export default AppSettingsContext;

export const AppSettingsProvider = ({ children }) => {
  const isPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDarkMode, setIsDarkMode] = useState(isPrefersDark);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const providerValue = {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
  };

  return (
    <AppSettingsContext.Provider value={providerValue}>
      {children}
    </AppSettingsContext.Provider>
  );
};
