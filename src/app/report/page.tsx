import AppLayout from "@/components/app-layout";
import { ReportDashboard } from "@/components/report-dashboard";

export default function ReportPage() {
  return (
    <AppLayout>
      <div className="space-y-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold font-headline text-center md:text-left">Expense Report</h1>
        <ReportDashboard />
      </div>
    </AppLayout>
  );
}
