import express from "express";
import { ExpenseCategory } from "./src/entity/expense-category";
import { ExpenseType } from "./src/entity/expense-type";
import { ExpenseItem } from "./src/entity/expense-item";
import { IncomeType } from "./src/entity/income-type";
import { IncomeItem } from "./src/entity/income-item";
import crudRouter from "./src/router/crudRouter";
import bodyParser from "body-parser";
import { connectToDatabase } from "./src/database";

connectToDatabase();

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());

app.use("/expense/category", crudRouter(ExpenseCategory));
app.use("/expense/type", crudRouter(ExpenseType));
app.use("/expense/item", crudRouter(ExpenseItem));
app.use("/income/type", crudRouter(IncomeType));
app.use("/income/item", crudRouter(IncomeItem));

app.listen(port, () => console.log(`Server is listening on port ${port}.`));
