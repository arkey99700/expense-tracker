import { useState, useEffect, useContext } from "react";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  createFilterOptions,
  IconButton,
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
import { AlertContext } from "../contexts/alertContext";

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
  const { handleSubmit, formState, resetField, watch, control, reset } =
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
  const watchName = watch("name");
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    axios
      .get<ExpenseOrIncome<typeof operation, "type">[]>(
        routes[`${capitalize(operation)}Type` as RouteName]
      )
      .then((result) => {
        setTypes(result.data);
      })
      .catch((error) => {
        console.error(error);

        alertContext?.showAlert(
          `Не удалось получить данные о категориях ${
            operation === "expense" ? "расходов" : "доходов"
          }`,
          "error"
        );
      });
  }, [operation, alertContext]);

  const submitForm: SubmitHandler<Inputs> = async (data): Promise<void> => {
    let typeId = types.find(
      (existingType) => existingType.name === data.type
    )?.id;

    if (!typeId) {
      try {
        const result = await axios.post(
          routes[`${capitalize(operation)}Type` as RouteName],
          {
            name: data.type,
          }
        );

        typeId = result.data.id as number;
        setTypes([...types, { id: typeId, name: result.data.name }]);
      } catch (error) {
        console.error(error);

        alertContext?.showAlert(
          `Произошла ошибка при добавлении категории ${
            operation === "expense" ? "расхода" : "дохода"
          }`,
          "error"
        );
      }
    }

    axios
      .post(routes[`${capitalize(operation)}Item` as RouteName], {
        name: data.name,
        value: data.sum,
        dateCreate: data.date.toDate(),
        type: typeId,
      })
      .then(() => {
        alertContext?.showAlert(
          `${operation === "expense" ? "Расход" : "Доход"} успешно добавлен!`,
          "success"
        );

        reset();
      })
      .catch((error) => {
        console.error(error);

        alertContext?.showAlert(
          `Произошла ошибка при добавлении ${
            operation === "expense" ? "расхода" : "дохода"
          }`,
          "error"
        );
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
              label="Название"
              error={Boolean(error)}
              helperText={error && `Введите название`}
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

        <Controller
          name="type"
          control={control}
          defaultValue={formState.defaultValues?.type}
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Autocomplete
              freeSolo
              autoSelect
              value={value}
              popupIcon={<ExpandMoreIcon />}
              options={
                types.length
                  ? types
                      .sort((a, b) => (a > b ? 1 : -1))
                      .map((type) => type.name)
                  : [
                      `Новая категория ${
                        operation === "expense" ? "расхода" : "дохода"
                      }`,
                    ]
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(error)}
                  helperText={
                    error &&
                    `Введите категорию ${
                      operation === "expense" ? "расхода" : "дохода"
                    }`
                  }
                  inputProps={{ ...params.inputProps, maxLength: 255 }}
                  label={`Категория ${
                    operation === "expense" ? "расхода" : "дохода"
                  }`}
                />
              )}
              getOptionLabel={(option) => option}
              filterOptions={(options, state) => {
                const filtered = stringFilter(options, state);

                return filtered.length ? filtered : [state.inputValue];
              }}
              onChange={(_, value) => onChange(value)}
            />
          )}
        ></Controller>

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
    </>
  );
}
