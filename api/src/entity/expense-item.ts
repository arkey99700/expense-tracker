import { Column, Entity, CreateDateColumn, ManyToOne } from "typeorm";
import { DBEntity } from "./db-entity";
import { ExpenseType } from "./expense-type";

@Entity()
export class ExpenseItem extends DBEntity {
  @Column({ type: "numeric", precision: 11, scale: 2 })
  value: number;

  @CreateDateColumn({ type: "date" })
  dateCreate: Date;

  @ManyToOne((type) => ExpenseType, (expenseType) => expenseType.id, {
    onDelete: "CASCADE",
  })
  type: ExpenseType;
}
