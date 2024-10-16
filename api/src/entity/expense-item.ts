import { Column, Entity, CreateDateColumn, ManyToOne } from "typeorm";
import { DBEntity } from "./db-entity";
import { ExpenseType } from "./expense-type";

@Entity()
export class ExpenseItem extends DBEntity {
  @Column({ type: "decimal", precision: 8, scale: 2 })
  value: number;

  @CreateDateColumn({ type: "date" })
  date: Date;

  @ManyToOne((type) => ExpenseType, (expenseType) => expenseType.id, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  type: ExpenseType;
}
