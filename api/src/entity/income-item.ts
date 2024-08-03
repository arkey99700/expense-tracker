import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { IncomeType } from "./income-type";
import { DBEntity } from "./db-entity";

@Entity()
export class IncomeItem extends DBEntity {
  @Column({ type: "numeric", precision: 11, scale: 2 })
  value: number;

  @Column()
  typeId: number;

  @OneToOne((type) => IncomeType, (incomeType) => incomeType.id)
  @JoinColumn({ name: "typeId", referencedColumnName: "id" })
  type: IncomeType;
}
