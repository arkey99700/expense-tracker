import { ThemeProvider } from "@emotion/react";
import Router from "./components/Router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme } from "@mui/material";
import { ruRU } from "@mui/x-date-pickers/locales";
import "dayjs/locale/ru";

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <Router />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
