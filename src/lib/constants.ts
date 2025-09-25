import type { LucideIcon } from "lucide-react";
import { Car, UtensilsCrossed, Coffee, ShoppingBag, Home, Clapperboard, Shirt, Bus, Gift } from "lucide-react";
import type { ExpenseCategory } from "./types";

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Cab",
  "Lunch",
  "Dinner",
  "Chai",
  "Groceries",
  "Entertainment",
  "Apparel",
  "Transport",
  "Gifts"
];

export const CATEGORY_ICONS: Record<ExpenseCategory, LucideIcon> = {
  Cab: Car,
  Lunch: UtensilsCrossed,
  Dinner: UtensilsCrossed,
  Chai: Coffee,
  Groceries: ShoppingBag,
  Entertainment: Clapperboard,
  Apparel: Shirt,
  Transport: Bus,
  Gifts: Gift,
};
