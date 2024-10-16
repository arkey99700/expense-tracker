import {
  Column,
  Entity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { DBEntity } from "./db-entity";
import { IncomeType } from "./income-type";

@Entity()
export class IncomeItem extends DBEntity {
  @Column({ type: "decimal", precision: 8, scale: 2 })
  value: number;

  @CreateDateColumn({ type: "date" })
  date: Date;

  @ManyToOne((type) => IncomeType, (incomeType) => incomeType.id, {
    nullable: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  type: IncomeType;
}
