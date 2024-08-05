import { Entity } from "./Entity";

export type IncomeItem = Entity & {
  value: number;
  typeId: number;
  dateCreate: Date;
};
