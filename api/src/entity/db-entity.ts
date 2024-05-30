import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export class DBEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @CreateDateColumn()
  dateCreate: Date;

  @UpdateDateColumn()
  dateEdit: Date;
}
