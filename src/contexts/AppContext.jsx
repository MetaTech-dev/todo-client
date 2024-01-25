import { useMediaQuery } from "@mui/material";
import { createContext, useCallback, useMemo, useState } from "react";

const AppContext = createContext();
export default AppContext;

export const AppSettingsProvider = ({ children }) => {
  const isPrefersDark = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    []
  );

  const [isDarkMode, setIsDarkMode] = useState(isPrefersDark);

  const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), []);

  const isMobile = useMediaQuery("(max-width:600px)");

  const providerValue = {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
    isMobile,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
