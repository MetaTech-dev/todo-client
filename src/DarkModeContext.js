import { createContext, useState } from "react";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import BedtimeOffOutlinedIcon from "@mui/icons-material/BedtimeOffOutlined";

const DarkModeContext = createContext();
export default DarkModeContext;

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const darkSwitch = () => (darkMode ? "dark" : "light");
  const darkIcons = () =>
    darkMode ? <BedtimeOffOutlinedIcon /> : <BedtimeOutlinedIcon />;

  const providerValue = {
    darkMode,
    setDarkMode,
    darkIcons,
    darkSwitch,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={providerValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
