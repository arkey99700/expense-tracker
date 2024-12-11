const routes = {
  ExpenseType: `${import.meta.env.VITE_API_URL as string}/expense/type`,
  ExpenseItem: `${import.meta.env.VITE_API_URL as string}/expense/item`,
  IncomeType: `${import.meta.env.VITE_API_URL as string}/income/type`,
  IncomeItem: `${import.meta.env.VITE_API_URL as string}/income/item`,
} as const;

export type RouteName = keyof typeof routes;
export type Route = (typeof routes)[RouteName];

export default routes;
