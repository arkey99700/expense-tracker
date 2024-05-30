import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { DBEntity } from "./db-entity";
import { ExpenseType } from "./expense-type";

@Entity()
export class ExpenseItem extends DBEntity {
  @Column({ type: "numeric", precision: 11, scale: 2 })
  value: number;

  @OneToOne(() => ExpenseType)
  @JoinColumn({ name: "type" })
  type: ExpenseType;
}
