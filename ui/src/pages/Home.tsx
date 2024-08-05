import { Button, Stack, Typography } from "@mui/material";
import LatestItems from "../components/LatestItems";
import { useNavigate } from "react-router-dom";
import Diagram from "../components/Diagram";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <LatestItems />
      <Diagram />
      <Typography
        component="h2"
        sx={{ fontSize: "32px", textAlign: "center", whiteSpace: "nowrap" }}
      >
        Есть к чему стремиться!
      </Typography>
      <Stack spacing={2} mt={5}>
        <Button
          variant="contained"
          sx={{ height: "75px", fontSize: "24px", textTransform: "unset" }}
          color="primary"
          size="large"
          onClick={() => navigate("/income/add")}
        >
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
          }}
          onClick={() => navigate("/expense/add")}
        >
          Добавить расход
        </Button>
      </Stack>
    </>
  );
}
