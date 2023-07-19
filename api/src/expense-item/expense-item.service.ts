import { Injectable } from '@nestjs/common';
import { CreateExpenseItemDto } from './dto/create-expense-item.dto';
import { UpdateExpenseItemDto } from './dto/update-expense-item.dto';
import { ExpenseItem } from './entities/expense-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExpenseItemService {
  constructor(
    @InjectRepository(ExpenseItem)
    private expenseItemRepo: Repository<ExpenseItem>,
  ) {}

  create(createExpenseItemDto: CreateExpenseItemDto) {
    return this.expenseItemRepo.create(createExpenseItemDto);
  }

  findAll() {
    return `This action returns all expenseItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseItem`;
  }

  update(id: number, updateExpenseItemDto: UpdateExpenseItemDto) {
    return `This action updates a #${id} expenseItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseItem`;
  }
}
