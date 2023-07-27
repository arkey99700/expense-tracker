import { Entity, OneToOne, JoinColumn } from "typeorm";
import { ExpenseCategory } from "./expense-category";
import { DBEntity } from "./db-entity";

@Entity()
export class ExpenseType extends DBEntity {
  @OneToOne(() => ExpenseCategory)
  @JoinColumn()
  category: ExpenseCategory;
}
