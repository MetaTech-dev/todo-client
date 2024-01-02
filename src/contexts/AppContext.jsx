import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AppContext = createContext();
export default AppContext;

export const AppSettingsProvider = ({ children }) => {
  const {
    isAuthenticated,
    isLoading: isLoadingAuthUser,
    loginWithRedirect,
  } = useAuth0();

  const isPrefersDark = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    []
  );

  const [isDarkMode, setIsDarkMode] = useState(isPrefersDark);

  const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), []);

  useEffect(() => {
    if (!isLoadingAuthUser && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoadingAuthUser]);

  const providerValue = {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode,
  };

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};
