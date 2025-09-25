import AppLayout from "@/components/app-layout";
import { BudgetManager } from "@/components/budget-manager";

export default function BudgetPage() {
  return (
    <AppLayout>
      <div className="space-y-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline text-center md:text-left">Monthly Budget</h1>
        <BudgetManager />
      </div>
    </AppLayout>
  );
}
