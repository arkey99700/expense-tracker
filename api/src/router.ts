import { Router } from "express";
import { ExpenseType } from "./entity/expense-type";
import { ExpenseItem } from "./entity/expense-item";
import { IncomeType } from "./entity/income-type";
import { IncomeItem } from "./entity/income-item";
import crudRouter from "./router/crudRouter";

const appRouter = Router();

appRouter.use("/expense/type", crudRouter(ExpenseType));
appRouter.use("/expense/item", crudRouter(ExpenseItem));
appRouter.use("/income/type", crudRouter(IncomeType));
appRouter.use("/income/item", crudRouter(IncomeItem));

export default appRouter;
