"use client";

import { AddExpenseForm } from "@/components/add-expense-form";
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddExpensePage() {
  const today = new Date();
  
  return (
    <AppLayout>
      <div className="flex justify-center items-start pt-4 md:pt-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Add New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <AddExpenseForm />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
