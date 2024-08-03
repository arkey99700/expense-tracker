import { Box } from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";

export default function Diagram() {
  const data = [
    { name: "Расходы", value: 600, fill: "crimson" },
    { name: "Доходы", value: 400, fill: "orange" },
  ];

  return (
    <Box display="flex" justifyContent="center">
      <PieChart width={400} height={400}>
        <Pie label data={data} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill}></Cell>
          ))}
        </Pie>
      </PieChart>
    </Box>
  );
}
