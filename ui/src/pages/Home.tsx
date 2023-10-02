import { Box, Button, Stack, Typography } from "@mui/material";
import LatestItems from "../components/LatestItems";
import { Cell, Pie, PieChart } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const data = [
    { name: "Расходы", value: 600, fill: "crimson" },
    { name: "Доходы", value: 400, fill: "orange" },
  ];

  return (
    <>
      <LatestItems />
      <Box>
        <PieChart width={400} height={400}>
          <Pie label data={data} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.fill}></Cell>
            ))}
          </Pie>
        </PieChart>
      </Box>
      <Typography component="h2" sx={{ fontSize: "32px", textAlign: "center" }}>
        Есть к чему стремиться!
      </Typography>
      <Stack spacing={2} mt={5}>
        <Button
          variant="contained"
          sx={{ height: "75px", fontSize: "24px", textTransform: "unset" }}
          color="primary"
          size="large"
          onClick={() => navigate("/income/add")}>
          Добавить доход
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "darkgray",
            fontSize: "24px",
            textTransform: "unset",
            height: "75px",
            "&:hover": { backgroundColor: "gray" },
          }}>
          Добавить расход
        </Button>
      </Stack>
    </>
  );
}
