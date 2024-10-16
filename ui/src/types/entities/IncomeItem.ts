import { Entity } from "./Entity";

export type IncomeItem = Entity & {
  value: number;
  type: { id: number; name: string };
  date: Date;
};
