import { Entity } from "typeorm";
import { DBEntity } from "./db-entity";

@Entity()
export class ExpenseType extends DBEntity {}
