import { Entity, OneToOne, JoinColumn } from "typeorm";
import { DBEntity } from "./db-entity";

@Entity()
export class ExpenseType extends DBEntity {}
