import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseItemModule } from './expense-item/expense-item.module';
import { ExpenseItemController } from './expense-item/expense-item.controller';
import { ExpenseItemService } from './expense-item/expense-item.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['**/entity/*.entity.ts'],
      synchronize: true,
    }),
    ExpenseItemModule,
  ],
  controllers: [ExpenseItemController],
  providers: [ExpenseItemService],
})
export class AppModule {}
