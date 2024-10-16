import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import AddIncome from "../pages/AddIncome";
import AddExpense from "../pages/AddExpense";
import IncomeList from "../pages/IncomeList";
import ExpenseList from "../pages/ExpenseList";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="income">
            <Route index></Route>
            <Route path="add" element={<AddIncome />}></Route>
            <Route path="list" element={<IncomeList />}></Route>
            <Route path=":id"></Route>
          </Route>
          <Route path="expense">
            <Route index></Route>
            <Route path="add" element={<AddExpense />}></Route>
            <Route path="list" element={<ExpenseList />}></Route>
            <Route path=":id"></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
