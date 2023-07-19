import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpenseItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column()
  type: string;
}
