import { List, ListItemButton, ListItemText } from "@mui/material";

export default function Menu() {
  return (
    <List>
      <ListItemButton>
        <ListItemText primary="Доходы"></ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Расходы"></ListItemText>
      </ListItemButton>
    </List>
  );
}
