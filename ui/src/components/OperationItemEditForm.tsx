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
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import routes, { RouteName } from "../api/Routes";
import NumberInput from "./NumberInput";
import { maxSumNumber } from "../utils/utils";
import { OperationType } from "../types/OperationType";
import { ExpenseOrIncome } from "../types/entities/ExpenseOrIncome";

type Inputs = {
  name: string;
  sum: number;
  date: Dayjs;
  type: string;
};

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
  const { handleSubmit, formState, resetField, watch, control } =
    useForm<Inputs>({
      defaultValues: {
        name: currentName ?? "",
        sum: currentSum ?? 0,
        date: currentDate ?? dayjs(),
        type: currentType ?? "",
      },
    });
  const [types, setTypes] = useState<
    ExpenseOrIncome<typeof operation, "type">[]
  >([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const watchName = watch("name");

  useEffect(() => {
    axios
      .get<ExpenseOrIncome<typeof operation, "type">[]>(
        routes[`${capitalize(operation)}Type` as RouteName]
      )
      .then((result): void => {
        setTypes(result.data);
      });
  }, [operation]);

  const submitForm: SubmitHandler<Inputs> = async (data): Promise<void> => {
    return console.log(data);

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
        <Controller
          name="name"
          control={control}
          defaultValue={formState.defaultValues?.name}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              value={value || ""}
              onChange={onChange}
              label={operation === "expense" ? "Назначение" : "Источник"}
              error={Boolean(error)}
              helperText={
                error &&
                `Введите ${operation === "expense" ? "назначение" : "источник"}`
              }
              inputProps={{ maxLength: 255 }}
              InputProps={{
                endAdornment: watchName && (
                  <IconButton onClick={() => resetField("name")}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            ></TextField>
          )}
        ></Controller>

        <Controller
          name="sum"
          control={control}
          defaultValue={formState.defaultValues?.sum}
          rules={{ required: true, validate: (value) => value > 0 }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <NumberInput
              fullWidth
              value={value || 0}
              label="Сумма"
              onChange={onChange}
              min={0}
              max={maxSumNumber}
              step={0.01}
              decimalScale={2}
              hideActionButtons={true}
              textAlign="left"
              error={Boolean(error)}
              helperText={error ? "Введите положительное число" : ""}
            />
          )}
        ></Controller>

        <Controller
          name="date"
          control={control}
          defaultValue={(formState.defaultValues as Inputs).date}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <DatePicker
              label="Дата"
              value={value}
              onChange={onChange}
              sx={{ flexGrow: 1 }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: Boolean(error),
                  helperText: error ? "Введите дату" : "",
                },
              }}
            />
          )}
        ></Controller>

        {/*<Autocomplete
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

            setType(value ?? "");
          }}
        /> */}

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
          onClick={handleSubmit(submitForm)}
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
