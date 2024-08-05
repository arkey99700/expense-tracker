import { Column, Entity, CreateDateColumn, ManyToOne } from "typeorm";
import { DBEntity } from "./db-entity";
import { IncomeType } from "./income-type";

@Entity()
export class IncomeItem extends DBEntity {
  @Column({ type: "numeric", precision: 11, scale: 2 })
  value: number;

  @CreateDateColumn({ type: "date" })
  dateCreate: Date;

  @ManyToOne((type) => IncomeType, (incomeType) => incomeType.id, {
    onDelete: "CASCADE",
  })
  type: IncomeType;
}
