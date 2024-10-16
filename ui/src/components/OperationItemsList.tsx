import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { OperationType } from "../types/OperationType";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ExpenseOrIncome } from "../types/entities/ExpenseOrIncome";
import axios from "axios";
import { ExpenseItem } from "../types/entities/ExpenseItem";
import routes, { RouteName } from "../api/Routes";
import PageHeader from "./PageHeader";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { Box, capitalize, CircularProgress, Typography } from "@mui/material";

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
  },
  {
    field: "value",
    headerName: "Сумма",
    flex: 1,
    type: "number",
  },
  {
    field: "created",
    headerName: "Дата",
    flex: 1,
    type: "date",
    valueFormatter: (value: Date) => dayjs(value).format("DD.MM.YYYY"),
  },
  {
    field: "type",
    headerName: "Тип",
    flex: 1,
  },
];

export default function OperationItemsList({ operation }: Props) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Row[]>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

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
      .then(async (result) => {
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
        />
      ) : (
        <Typography>
          {operation === "expense" ? "Расходы" : "Доходы"} не найдены
        </Typography>
      )}
    </>
  );
}
