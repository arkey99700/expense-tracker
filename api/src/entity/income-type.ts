import { Entity, OneToMany } from "typeorm";
import { DBEntity } from "./db-entity";
import { IncomeItem } from "./income-item";

@Entity()
export class IncomeType extends DBEntity {
  @OneToMany((item) => IncomeItem, (incomeItem) => incomeItem.type, {
    nullable: false,
  })
  item: IncomeItem;
}
