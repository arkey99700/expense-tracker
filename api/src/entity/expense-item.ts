import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { DBEntity } from "./db-entity";
import { ExpenseType } from "./expense-type";

@Entity()
export class ExpenseItem extends DBEntity {
  @Column()
  value: number;

  @OneToOne(() => ExpenseType)
  @JoinColumn()
  type: ExpenseType;
}
