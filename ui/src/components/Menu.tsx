import {
  Dispatch,
  SetStateAction,
  ReactElement,
  MouseEventHandler,
} from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

type MenuProps = {
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

type MenuItemProps = {
  link: string;
  name: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
  icon?: ReactElement;
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
  {
    name: "Список доходов",
    link: "/income/list",
  },
  {
    name: "Список расходов",
    link: "/expense/list",
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
