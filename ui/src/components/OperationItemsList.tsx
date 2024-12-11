import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { OperationType } from "../types/OperationType";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ExpenseOrIncome } from "../types/entities/ExpenseOrIncome";
import axios from "axios";
import { ExpenseItem } from "../types/entities/ExpenseItem";
import routes, { RouteName } from "../api/Routes";
import { Box, capitalize, CircularProgress, Typography } from "@mui/material";
import { diff } from "deep-object-diff";

type Props = {
  operation: OperationType;
};

type Row = {
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
    field: "created",
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

  const updateRow = async (id: number, values: Partial<Row>) => {
    // only name, value and date for now
    axios
      .patch(routes[`${capitalize(operation)}Item` as RouteName], values)
      .then((result) => {
        console.log(result);
      });

    console.log(values);
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
          processRowUpdate={async (updatedRow, originalRow) =>
            updateRow(diffRows(originalRow, updatedRow)).then(() => updatedRow)
          }
        />
      ) : (
        <Typography>
          {operation === "expense" ? "Расходы" : "Доходы"} не найдены
        </Typography>
      )}
    </>
  );
}
