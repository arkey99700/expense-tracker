import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { DBEntity } from "./db-entity";
import { ExpenseType } from "./expense-type";

@Entity()
export class ExpenseItem extends DBEntity {
  @Column({ type: "numeric", precision: 11, scale: 2 })
  value: number;

  @Column()
  typeId: number;

  @ManyToOne((type) => ExpenseType, (expenseType) => expenseType.id)
  @JoinColumn({ name: "typeId", referencedColumnName: "id" })
  type: ExpenseType;
}
