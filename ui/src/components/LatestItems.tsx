import { Chip, Stack } from "@mui/material";

export default function LatestItems() {
  return (
    <Stack direction="row" spacing={2} pt={2}>
      <Chip
        clickable
        sx={{
          height: "auto",
          borderRadius: "20px",
          fontSize: "20px",
          padding: "10px 30px",
          "& span": { padding: 0 },
        }}
        label="Кредиты"></Chip>
      <Chip
        clickable
        sx={{
          height: "auto",
          borderRadius: "20px",
          fontSize: "20px",
          padding: "10px 30px",
          "& span": { padding: 0 },
        }}
        label="Продукты"></Chip>
      <Chip
        clickable
        sx={{
          height: "auto",
          borderRadius: "20px",
          fontSize: "20px",
          padding: "10px 30px",
          "& span": { padding: 0 },
        }}
        label="Бытовая химия"></Chip>
    </Stack>
  );
}
