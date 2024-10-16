import { Entity } from "./Entity";

export type ExpenseItem = Entity & {
  value: number;
  type: { id: number; name: string };
  date: Date;
};
