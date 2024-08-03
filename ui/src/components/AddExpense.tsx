import { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  createFilterOptions,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import routes from "../api/Routes";
import { ExpenseType } from "../types/entities/ExpenseType";
import NumberInput from "./NumberInput";
import { maxSumNumber } from "../utils/utils";

const stringFilter = createFilterOptions<string>();

export default function AddExpense() {
  const [expenseTypes, setExpenseTypes] = useState<
    Pick<ExpenseType, "id" | "name">[]
  >([]);
  const [name, setName] = useState<string>("");
  const [sum, setSum] = useState<number>(0);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [type, setType] = useState<string>("");

  const [nameError, setNameError] = useState<boolean>(false);
  const [sumError, setSumError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [typeError, setTypeError] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    axios.get<ExpenseType[]>(routes.ExpenseType).then((result): void => {
      setExpenseTypes(
        result.data.map((type) => ({ id: type.id, name: type.name }))
      );
    });
  }, []);

  const submitForm = async (): Promise<void> => {
    if (!name) {
      return setNameError(true);
    }

    if (!sum) {
      return setSumError(true);
    }

    if (!date.isValid()) {
      return setDateError(true);
    }

    if (!type) {
      return setTypeError(true);
    }

    let typeId = expenseTypes.find(
      (expenseType) => expenseType.name === type
    )?.id;

    if (!typeId) {
      await axios
        .post(routes.ExpenseType, {
          name: type,
        })
        .then((result) => {
          typeId = result.data.id;
        });
    }

    axios
      .post(routes.ExpenseItem, {
        name,
        value: sum,
        dateCreate: date.toDate(),
        typeId,
      })
      .then(() => {
        setShowAlert(true);
        setName("");
        setSum(0);
        setDate(dayjs());
        setType("");
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root:not(:last-child)": {
            mb: 3,
          },
        }}
      >
        <TextField
          value={name}
          label="Назначение"
          id="name"
          fullWidth
          onChange={(event) => {
            setNameError(false);
            setName(event.target.value);
          }}
          error={nameError}
          helperText={nameError && "Введите назначене"}
          InputProps={{
            endAdornment: name && (
              <IconButton onClick={() => setName("")}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />

        <NumberInput
          value={Number(sum)}
          label="Сумма"
          id="sum"
          fullWidth
          onChange={(value) => {
            setSumError(false);
            setSum(value);
          }}
          min={0}
          max={maxSumNumber}
          step={0.01}
          decimalScale={2}
          hideActionButtons={true}
          textAlign="left"
          error={sumError}
          helperText={sumError ? "Введите сумму" : ""}
        />

        <DatePicker
          label="Дата"
          defaultValue={dayjs()}
          value={date}
          onChange={(newValue) => {
            setDateError(false);
            newValue && setDate(newValue);
          }}
          sx={{ flexGrow: 1 }}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError ? "Введите дату" : "",
            },
          }}
        />

        <Autocomplete
          value={type}
          id="source"
          popupIcon={<ExpandMoreIcon />}
          options={
            expenseTypes.length
              ? expenseTypes
                  .sort((a, b) => (a > b ? 1 : -1))
                  .map((type) => type.name)
              : []
          }
          renderInput={(params) => (
            <TextField
              {...params}
              error={typeError}
              helperText={typeError && "Введите тип расхода"}
              label="Тип расхода"
            />
          )}
          getOptionLabel={(option) => option}
          freeSolo
          filterOptions={(options, state) => {
            const filtered = stringFilter(options, state);

            return filtered.length ? filtered : [state.inputValue];
          }}
          autoSelect
          onChange={(_, value) => {
            setTypeError(false);
            value && setType(value);
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
          size="large"
          onClick={submitForm}
        >
          Добавить
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showAlert}
        autoHideDuration={5000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowAlert(false)}
        >
          Расход успешно добавлен!
        </Alert>
      </Snackbar>
    </>
  );
}
