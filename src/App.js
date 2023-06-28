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
import { blueGrey } from "@mui/material/colors";
import router from "./router";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: blueGrey,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ToDoProvider>
            <RouterProvider router={router} />
          </ToDoProvider>
        </LocalizationProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
