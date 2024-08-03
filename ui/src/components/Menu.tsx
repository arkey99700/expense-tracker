import { Dispatch, SetStateAction, ReactNode } from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

type MenuProps = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

type MenuItemProps = {
  link: string;
  name: string;
  onClick: () => void;
  icon?: ReactNode;
};

const menuData = [
  {
    name: "Добавить доход",
    link: "/income/add",
  },
  {
    name: "Добавить расход",
    link: "/expense/add",
  },
];

const MenuItem = function ({ link, name, onClick }: MenuItemProps) {
  return (
    <Link to={link} onClick={onClick}>
      <ListItemButton sx={{ paddingRight: "64px" }}>
        <ListItemText primary={name}></ListItemText>
      </ListItemButton>
    </Link>
  );
};

export default function Menu({ setMenuOpen }: MenuProps) {
  return (
    <List>
      {menuData.map((menuItem) => (
        <MenuItem
          key={menuItem.name}
          link={menuItem.link}
          name={menuItem.name}
          onClick={() => setMenuOpen(false)}
        />
      ))}
    </List>
  );
}
