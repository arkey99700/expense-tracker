import { createContext, useState, PropsWithChildren } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertColor } from "@mui/material";

type AlertContextValue = {
  showAlert: ShowAlert;
};

type ShowAlert = (message: string, severity: AlertColor) => void;

export const AlertContext = createContext<AlertContextValue | null>(null);

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const showAlert: ShowAlert = (message, severity = "info") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const hideAlert = () => {
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={hideAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ top: "84px !important" }}
      >
        <Alert severity={severity} variant="filled" onClose={hideAlert}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
