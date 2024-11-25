import { Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

export default function ExpenseIncomeRatioPieChart() {
  const data = [
    { name: "Расходы", value: 600, fill: "crimson" },
    { name: "Доходы", value: 400, fill: "orange" },
  ];

  return (
    <Box display="flex" justifyContent="center">
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 100 },
              { id: 0, value: 200 },
            ],
          },
        ]}
      />
    </Box>
  );
}
