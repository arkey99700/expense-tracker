import {
  Autocomplete,
  Box,
  Button,
  TextField,
  createFilterOptions,
} from "@mui/material";
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const incomeSources = ["Зарплата", "Аванс", "Подарок", "Премия"];

const filter = createFilterOptions<string>();

export default function AddIncomeForm() {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root:not(:last-child)": {
          mb: 3,
        },
      }}>
      <TextField label="Название*" id="name" fullWidth />
      <TextField label="Сумма*" id="sum" fullWidth />
      <MobileDatePicker
        label="Дата"
        defaultValue={dayjs()}
        sx={{ flexGrow: 1 }}
      />
      <Autocomplete
        id="source"
        popupIcon={<ExpandMoreIcon />}
        options={incomeSources}
        renderInput={(params) => <TextField {...params} label="Источник" />}
        disableClearable
        freeSolo
        filterOptions={(options, state) => {
          const filtered = filter(options, state);
          return filtered.length ? filtered : [state.inputValue];
        }}
      />
      <Button
        variant="contained"
        sx={{
          height: "75px",
          fontSize: "24px",
          textTransform: "unset",
          marginTop: "50px",
        }}
        color="primary"
        size="large">
        Добавить
      </Button>
    </Box>
  );
}
