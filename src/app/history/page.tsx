import AppLayout from "@/components/app-layout";
import { ExpenseHistory } from "@/components/expense-history";

export default function HistoryPage() {
  return (
    <AppLayout>
      <div className="space-y-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline text-center md:text-left">Expense History</h1>
        <ExpenseHistory />
      </div>
    </AppLayout>
  );
}
