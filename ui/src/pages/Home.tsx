import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import LatestItems from "../components/LatestItems";
import { useNavigate } from "react-router-dom";
import ExpenseIncomeRatioPieChart from "../components/ExpenseIncomeRatioPieChart";

export default function Home() {
  const navigate = useNavigate();
  const { palette } = useTheme();

  console.log(palette);

  return (
    <>
      <Box sx={{ marginBottom: "24px" }}>
        <LatestItems />
      </Box>
      <ExpenseIncomeRatioPieChart />
      <Typography
        component="h2"
        sx={{ fontSize: "32px", textAlign: "center", whiteSpace: "nowrap" }}
      >
        Есть к чему стремиться!
      </Typography>
      <Stack spacing={2} mt={5}>
        <Button
          variant="contained"
          sx={{
            height: "75px",
            backgroundColor: palette.primary.main,
            fontSize: "24px",
            textTransform: "unset",
          }}
          size="large"
          onClick={() => navigate("/income/add")}
        >
          Добавить доход
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            backgroundColor: palette.primary.light,
            fontSize: "24px",
            textTransform: "unset",
            height: "75px",
          }}
          onClick={() => navigate("/expense/add")}
        >
          Добавить расход
        </Button>
      </Stack>
    </>
  );
}
