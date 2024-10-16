import { Router } from "express";
import { ExpenseType } from "./entity/expense-type";
import { ExpenseItem } from "./entity/expense-item";
import { IncomeType } from "./entity/income-type";
import { IncomeItem } from "./entity/income-item";
import createRouter from "./router/createRouter";

const appRouter = Router();

appRouter.use("/expense/type", createRouter(ExpenseType));
appRouter.use("/expense/item", createRouter(ExpenseItem));
appRouter.use("/income/type", createRouter(IncomeType));
appRouter.use("/income/item", createRouter(IncomeItem));

export default appRouter;
