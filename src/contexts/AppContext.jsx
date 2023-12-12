import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AppContext = createContext();
export default AppContext;

export const AppSettingsProvider = ({ children }) => {
  const { isAuthenticated, isLoading: isLoadingAuthUser } = useAuth0();

  const isPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDarkMode, setIsDarkMode] = useState(isPrefersDark);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // useEffect(() => {
  //   if (!isLoadingAuthUser) {
  //     return <div>HI IT IS LOAD TIME</div>;
  //   }
  // }, [isAuthenticated, isLoadingAuthUser]);

  const providerValue = {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
    isAuthenticated,
    isLoadingAuthUser,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
