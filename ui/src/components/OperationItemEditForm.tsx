import { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  createFilterOptions,
  IconButton,
  Snackbar,
  Alert,
  capitalize,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import routes, { RouteName } from "../api/Routes";
import NumberInput from "./NumberInput";
import { maxSumNumber } from "../utils/utils";
import { OperationType } from "../types/OperationType";
import { ExpenseOrIncome } from "../types/entities/ExpenseOrIncome";

type Props = {
  operation: OperationType;
  currentName?: string;
  currentSum?: number;
  currentDate?: Dayjs;
  currentType?: string;
};

const stringFilter = createFilterOptions<string>();

export default function OperationItemEditForm({
  operation,
  currentName,
  currentSum,
  currentDate,
  currentType,
}: Props) {
  const [types, setTypes] = useState<
    ExpenseOrIncome<typeof operation, "type">[]
  >([]);
  const [name, setName] = useState<string>(currentName ?? "");
  const [sum, setSum] = useState<number>(currentSum ?? 0);
  const [date, setDate] = useState<Dayjs>(currentDate ?? dayjs());
  const [type, setType] = useState<string>(currentType ?? "");

  const [nameError, setNameError] = useState<boolean>(false);
  const [sumError, setSumError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [typeError, setTypeError] = useState<boolean>(false);

  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<ExpenseOrIncome<typeof operation, "type">[]>(
        routes[`${capitalize(operation)}Type` as RouteName]
      )
      .then((result): void => {
        setTypes(result.data);
      });
  }, [operation]);

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

    let typeId = types.find((existingType) => existingType.name === type)?.id;

    if (!typeId) {
      await axios
        .post(routes[`${capitalize(operation)}Type` as RouteName], {
          name: type,
        })
        .then((result) => {
          typeId = result.data.id;
        });
    }

    axios
      .post(routes[`${capitalize(operation)}Item` as RouteName], {
        name,
        value: sum,
        dateCreate: date.toDate(),
        type: typeId,
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
          label={operation === "expense" ? "Назначение" : "Источник"}
          id="name"
          fullWidth
          onChange={(event) => {
            setNameError(false);
            setName(event.target.value);
          }}
          error={nameError}
          helperText={
            nameError &&
            `Введите ${operation === "expense" ? "назначение" : "источник"}`
          }
          inputProps={{ maxLength: 255 }}
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
            types.length
              ? types.sort((a, b) => (a > b ? 1 : -1)).map((type) => type.name)
              : ["Новый тип расхода"]
          }
          renderInput={(params) => (
            <TextField
              {...params}
              error={typeError}
              helperText={
                typeError &&
                `Введите тип ${operation === "expense" ? "расхода" : "дохода"}`
              }
              inputProps={{ ...params.inputProps, maxLength: 255 }}
              label={`Тип ${operation === "expense" ? "расхода" : "дохода"}`}
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
        autoHideDuration={4000}
        onClose={() => setShowAlert(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setShowAlert(false)}
        >
          {operation === "expense" ? "Расход" : "Доход"} успешно добавлен!
        </Alert>
      </Snackbar>
    </>
  );
}
