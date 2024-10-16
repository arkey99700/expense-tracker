import express from "express";
import cors from "cors";
import { ExpenseType } from "./src/entity/expense-type";
import { ExpenseItem } from "./src/entity/expense-item";
import { IncomeType } from "./src/entity/income-type";
import { IncomeItem } from "./src/entity/income-item";
import createRouter from "./src/router/createRouter";
import bodyParser from "body-parser";
import { connectToDatabase } from "./src/database";
import "reflect-metadata";

connectToDatabase();

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors({ origin: process.env.API_URL }));
app.use(bodyParser.json());

app.use("/expense/type", createRouter(ExpenseType));
app.use("/expense/item", createRouter(ExpenseItem));
app.use("/income/type", createRouter(IncomeType));
app.use("/income/item", createRouter(IncomeItem));

app.listen(port, () => console.log(`Server is listening on port ${port}.`));
