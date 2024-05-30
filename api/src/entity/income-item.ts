import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { IncomeType } from "./income-type";
import { DBEntity } from "./db-entity";

@Entity()
export class IncomeItem extends DBEntity {
  @Column({ type: "numeric", precision: 11, scale: 2 })
  value: number;

  @OneToOne(() => IncomeType)
  @JoinColumn({ name: "type" })
  type: IncomeType;
}
