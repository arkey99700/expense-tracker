import { Box, Typography } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import AddExpense from "../components/AddExpense";

export default function AddExpensePage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "10px",
          margin: "20px 0",
        }}>
        <ArrowCircleDownIcon sx={{ width: "40px", height: "40px" }} />
        <Typography
          component="h1"
          sx={{ fontSize: "30px", textAlign: "center" }}>
          Добавление расхода
        </Typography>
      </Box>
      <AddExpense />
    </>
  );
}
