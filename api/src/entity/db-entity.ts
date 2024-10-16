import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export class DBEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;
}
