import { Box, Typography } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import AddIncome from "../components/AddIncome";

export default function AddIncomePage() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "10px",
          margin: "20px 0",
        }}>
        <ArrowCircleUpIcon sx={{ width: "40px", height: "40px" }} />
        <Typography
          component="h1"
          sx={{ fontSize: "32px", textAlign: "center" }}>
          Добавление дохода
        </Typography>
      </Box>
      <AddIncome />
    </>
  );
}
