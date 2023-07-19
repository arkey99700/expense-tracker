import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpenseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
