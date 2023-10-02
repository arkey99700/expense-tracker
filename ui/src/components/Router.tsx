import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import AddIncomePage from "../pages/AddIncomePage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="income">
            <Route index></Route>
            <Route path="add" element={<AddIncomePage />}></Route>
            <Route path=":id"></Route>
          </Route>
          <Route path="expense">
            <Route index></Route>
            <Route path="add"></Route>
            <Route path=":id"></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
