import { Module } from '@nestjs/common';
import { ExpenseItemService } from './expense-item.service';
import { ExpenseItemController } from './expense-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseItem } from './entities/expense-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseItem])],
  controllers: [ExpenseItemController],
  providers: [ExpenseItemService],
  exports: [TypeOrmModule],
})
export class ExpenseItemModule {}
