import { CssBaseline } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ToDoProvider } from "./ToDoContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blueGrey, orange } from "@mui/material/colors";
import router from "./router";
import { useContext } from "react";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: blueGrey,
      text: {
        // primary: orange[500],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <ToDoProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ToDoProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
