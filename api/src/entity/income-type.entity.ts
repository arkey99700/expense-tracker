import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IncomeType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
