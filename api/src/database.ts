import { DataSource } from "typeorm";
import { ExpenseCategory } from "./entity/expense-category";
import { ExpenseItem } from "./entity/expense-item";
import { ExpenseType } from "./entity/expense-type";
import { IncomeItem } from "./entity/income-item";
import { IncomeType } from "./entity/income-type";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [ExpenseCategory, ExpenseItem, ExpenseType, IncomeItem, IncomeType],
  subscribers: [],
  migrations: [],
});

export const connectToDatabase = async () => {
  await dataSource
    .initialize()
    .then(() => console.log("Successfully connected to database!"));

  return dataSource;
};
