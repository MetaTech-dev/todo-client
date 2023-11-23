import { useContext } from "react";
import { CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ToDoProvider } from "./contexts/ToDoContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import router from "./router";
import AppSettingsContext from "./contexts/AppSettingsContext";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  const { isDarkMode } = useContext(AppSettingsContext);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: blueGrey,
      secondary: {
        main: isDarkMode ? "#fff" : "#000",
        light: "#3f3f40",
      },
      neutral: "#90A4AE66",
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ToDoProvider>
              <SnackbarProvider maxSnack={1}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
              </SnackbarProvider>
            </ToDoProvider>
          </LocalizationProvider>
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
