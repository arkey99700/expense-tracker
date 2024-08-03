const routes = {
  ExpenseType: `${import.meta.env.VITE_API_URL}/expense/type`,
  ExpenseItem: `${import.meta.env.VITE_API_URL}/expense/item`,
  IncomeType: `${import.meta.env.VITE_API_URL}/income/type`,
  IncomeItem: `${import.meta.env.VITE_API_URL}/income/item`,
};

export type RouteName = keyof typeof routes;

export default routes;
