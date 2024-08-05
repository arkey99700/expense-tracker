import { EntityType } from "../EntityType";
import { OperationType } from "../OperationType";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseType } from "./ExpenseType";
import { IncomeItem } from "./IncomeItem";
import { IncomeType } from "./IncomeType";

export type ExpenseOrIncome<
  O extends OperationType,
  E extends EntityType
> = O extends "expense"
  ? E extends "item"
    ? ExpenseItem
    : ExpenseType
  : O extends "income"
  ? E extends "item"
    ? IncomeItem
    : IncomeType
  : never;
