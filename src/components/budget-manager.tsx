"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./auth-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "./ui/progress";
import { startOfMonth, endOfMonth } from "date-fns";
import { Loader2 } from "lucide-react";
import type { Budget, Expense } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";

const formSchema = z.object({
  budget: z.coerce.number().positive({ message: "Budget must be a positive number." }),
});

export function BudgetManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [budget, setBudget] = useState<number | null>(null);
  const [totalSpend, setTotalSpend] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (user) {
      const fetchBudgetData = async () => {
        setLoading(true);
        // Fetch budget
        const budgetRef = doc(db, "users", user.uid, "settings", "budget");
        const budgetSnap = await getDoc(budgetRef);
        if (budgetSnap.exists()) {
          const budgetData = budgetSnap.data() as Budget;
          setBudget(budgetData.amount);
          form.setValue("budget", budgetData.amount);
        }

        // Fetch expenses for current month
        const start = startOfMonth(new Date());
        const end = endOfMonth(new Date());
        const expensesCol = collection(db, "users", user.uid, "expenses");
        const q = query(
          expensesCol,
          where("date", ">=", Timestamp.fromDate(start)),
          where("date", "<=", Timestamp.fromDate(end))
        );
        const querySnapshot = await getDocs(q);
        const monthlySpend = querySnapshot.docs
          .map((doc) => doc.data() as Expense)
          .reduce((sum, exp) => sum + exp.amount, 0);
        
        setTotalSpend(monthlySpend);
        setLoading(false);
      };
      fetchBudgetData();
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const budgetRef = doc(db, "users", user.uid, "settings", "budget");
      await setDoc(budgetRef, { amount: values.budget });
      setBudget(values.budget);
      toast({
        title: "Success",
        description: "Your monthly budget has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update budget.",
        variant: "destructive",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  const { progress, remaining, isOverBudget } = useMemo(() => {
    if (budget === null || budget === 0) {
      return { progress: 0, remaining: 0, isOverBudget: false };
    }
    const progressPercentage = (totalSpend / budget) * 100;
    const remainingAmount = budget - totalSpend;
    return {
      progress: Math.min(progressPercentage, 100),
      remaining: remainingAmount,
      isOverBudget: totalSpend > budget,
    };
  }, [budget, totalSpend]);

  if (loading) {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-32" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-6 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Set Your Budget</CardTitle>
          <CardDescription>
            Enter your total budget for the month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Budget Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Budget
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {budget !== null && (
        <Card>
            <CardHeader>
                <CardTitle>Current Month's Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Progress value={progress} className={cn(isOverBudget && "bg-destructive/20 [&>*]:bg-destructive")} />
                <div className="flex justify-between text-sm font-medium">
                    <span>Spent: ${totalSpend.toFixed(2)}</span>
                    <span className={cn(isOverBudget ? 'text-destructive' : 'text-emerald-600')}>
                        {isOverBudget 
                            ? `Over by $${Math.abs(remaining).toFixed(2)}`
                            : `Remaining: $${remaining.toFixed(2)}`
                        }
                    </span>
                </div>
                {isOverBudget && (
                    <p className="text-center text-destructive font-semibold">
                        Warning: You are over your budget!
                    </p>
                )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
