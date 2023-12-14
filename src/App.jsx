import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
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
import { blueGrey, grey } from "@mui/material/colors";
import router from "./router";
import AppContext from "./contexts/AppContext";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoadingUser from "./components/loading/LoadingUser";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  const { isDarkMode } = useContext(AppContext);

  const { error: authError, isLoading: isLoadingAuthUser } = useAuth0();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: blueGrey,
      secondary: grey,
      neutral: {
        main: "#90A4AE66",
        contrastText: isDarkMode ? "#fff" : "#000",
      },
    },
  });

  useEffect(() => {
    if (authError) {
      enqueueSnackbar(authError.message, {
        variant: "error",
      });
    }
  }, [authError]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ToDoProvider>
              <SnackbarProvider maxSnack={1}>
                {isLoadingAuthUser && <LoadingUser />}
                {!isLoadingAuthUser && <RouterProvider router={router} />}
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
