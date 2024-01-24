import { useContext, useState } from "react";
import { CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey, grey } from "@mui/material/colors";
import router from "./router";
import AppContext from "./contexts/AppContext";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

function App() {
  const [queryClient] = useState(() => new QueryClient());

  const { isDarkMode } = useContext(AppContext);

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
    components: {
      MuiCardHeader: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: isDarkMode
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }),
        },
      },
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        }),
      },
    },
  });

  return (
    <ClerkProvider
      publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}
      appearance={isDarkMode && { baseTheme: dark }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SnackbarProvider maxSnack={1}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
              </SnackbarProvider>
            </LocalizationProvider>
          </CssBaseline>
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
