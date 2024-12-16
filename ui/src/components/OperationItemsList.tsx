import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { OperationType } from "../types/OperationType";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { ExpenseOrIncome } from "../types/entities/ExpenseOrIncome";
import axios from "axios";
import { ExpenseItem } from "../types/entities/ExpenseItem";
import routes, { RouteName } from "../api/Routes";
import { Box, capitalize, CircularProgress, Typography } from "@mui/material";
import { diff } from "deep-object-diff";
import { AlertContext } from "../contexts/alertContext";

type Props = {
  operation: OperationType;
};

type Row = { [key: string]: unknown } & {
  id: number;
  name: string;
  value: number;
  created: Date;
  type: string;
};

const columns: GridColDef<Row>[] = [
  {
    field: "id",
    headerName: "ID",
    type: "number",
  },
  {
    field: "name",
    headerName: "Название",
    flex: 1,
    editable: true,
  },
  {
    field: "value",
    headerName: "Сумма",
    flex: 1,
    type: "number",
    editable: true,
  },
  {
    field: "date",
    headerName: "Дата",
    flex: 1,
    type: "date",
    valueFormatter: (value: Date) => dayjs(value).format("DD.MM.YYYY"),
    editable: true,
  },
  {
    field: "type",
    headerName: "Категория",
    flex: 1,
  },
];

const diffRows = (a: Row, b: Row): Partial<Row> => {
  return diff(a, b);
};

export default function OperationItemsList({ operation }: Props) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const alertContext = useContext(AlertContext);

  const updateRow = async (
    id: number,
    values: Partial<Row>
  ): Promise<boolean> => {
    if (!Object.keys(values).length) {
      return false;
    }

    // only name, value and date for now
    if (values.id) {
      delete values.id;
    }

    axios.patch(
      `${routes[`${capitalize(operation)}Item` as RouteName]}/${id}`,
      values
    );

    return true;
  };

  useEffect(() => {
    axios
      .get<ExpenseOrIncome<typeof operation, "item">[]>(
        routes[`${capitalize(operation)}Item` as RouteName],
        {
          params: {
            // limit: pageSize,
            // offset: pageSize * page,
          },
        }
      )
      .then((result) => {
        setRows(
          result.data.map<Row>(
            (item: ExpenseItem): Row => ({
              id: item.id,
              name: item.name,
              value: item.value,
              created: new Date(item.date),
              type: item.type.name,
            })
          )
        );
        setLoading(false);
      });
  }, [page, pageSize, operation]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : rows.length ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize, page } },
          }}
          processRowUpdate={async (updatedRow, originalRow) => {
            for (const cellName in updatedRow) {
              if (typeof updatedRow[cellName] === "string") {
                updatedRow[cellName] = updatedRow[cellName].trim();
              }

              // no falsy values for now
              if (!updatedRow[cellName]) {
                delete updatedRow[cellName];
              }
            }

            return updateRow(
              originalRow.id,
              diffRows(originalRow, updatedRow)
            ).then((result) => {
              if (result) {
                alertContext?.showAlert(
                  `${
                    operation === "expense" ? "Расход" : "Доход"
                  } успешно изменен`,
                  "success"
                );

                return updatedRow;
              } else {
                return originalRow;
              }
            });
          }}
          onProcessRowUpdateError={(error) => {
            console.log(error);

            alertContext?.showAlert(
              `Произошла ошибка при изменении ${
                operation === "expense" ? "расхода" : "дохода"
              }`,
              "error"
            );
          }}
        />
      ) : (
        <Typography>
          {operation === "expense" ? "Расходы" : "Доходы"} не найдены
        </Typography>
      )}
    </>
  );
}
