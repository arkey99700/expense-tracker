import { Entity, OneToMany } from "typeorm";
import { DBEntity } from "./db-entity";
import { ExpenseItem } from "./expense-item";

@Entity()
export class ExpenseType extends DBEntity {
  @OneToMany((item) => ExpenseItem, (expenseItem) => expenseItem.type, {
    nullable: false,
  })
  item: ExpenseItem;
}
