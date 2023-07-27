import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { IncomeType } from "./income-type";
import { DBEntity } from "./db-entity";

@Entity()
export class IncomeItem extends DBEntity {
  @Column()
  value: number;

  @OneToOne(() => IncomeType)
  @JoinColumn()
  type: IncomeType;
}
