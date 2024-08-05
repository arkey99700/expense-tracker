import { ReactElement } from "react";
import { Box, Typography } from "@mui/material";

type Props = {
  title: string;
  icon?: ReactElement;
};

export default function PageHeader({ title, icon }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        columnGap: "10px",
        margin: "20px 0",
      }}
    >
      {icon}
      <Typography component="h1" sx={{ fontSize: "30px", textAlign: "center" }}>
        {title}
      </Typography>
    </Box>
  );
}
