import type { Timestamp } from "firebase/firestore";

export type ExpenseCategory =
  | "Cab"
  | "Lunch"
  | "Dinner"
  | "Chai"
  | "Groceries"
  | "Entertainment"
  | "Apparel"
  | "Transport"
  | "Gifts";

export interface Expense {
  id?: string;
  userId: string;
  name: string;
  amount: number;
  category: ExpenseCategory;
  notes: string;
  date: Date | Timestamp;
}

export interface Budget {
  amount: number;
}
