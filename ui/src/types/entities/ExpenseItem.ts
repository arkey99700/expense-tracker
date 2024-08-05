import { Entity } from "./Entity";

export type ExpenseItem = Entity & {
  value: number;
  typeId: number;
  dateCreate: Date;
};
