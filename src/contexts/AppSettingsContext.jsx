import { createContext, useState } from "react";

const AppSettingsContext = createContext();
export default AppSettingsContext;

export const AppSettingsProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
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
