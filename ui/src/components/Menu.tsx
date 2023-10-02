import { List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Menu({ setMenuOpen }: Props) {
  return (
    <List>
      <Link to="income/add" onClick={() => setMenuOpen(false)}>
        <ListItemButton>
          <ListItemText primary="Добавить доход"></ListItemText>
        </ListItemButton>
      </Link>
      <ListItemButton>
        <ListItemText primary="Добавить расход"></ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Добавить новую категорию"></ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Кошельки"></ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Настройки"></ListItemText>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary="Поддержка"></ListItemText>
      </ListItemButton>
    </List>
  );
}
