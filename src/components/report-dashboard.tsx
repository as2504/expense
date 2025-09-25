"use client";

import { useState, useEffect, useMemo } from "react";
import { DateRange } from "react-day-picker";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar as CalendarIcon, Loader2, BarChart, TrendingUp, PieChart as PieChartIcon, Wallet } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { addDays, format, startOfMonth, differenceInDays } from "date-fns";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, XAxis, YAxis, Cell, Legend } from "recharts";
import type { Expense, ExpenseCategory } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";

const chartConfig = {
  amount: {
    label: "Amount",
  },
  Cab: { label: "Cab", color: "hsl(var(--chart-1))" },
  Lunch: { label: "Lunch", color: "hsl(var(--chart-2))" },
  Dinner: { label: "Dinner", color: "hsl(var(--chart-3))" },
  Chai: { label: "Chai", color: "hsl(var(--chart-4))" },
  Groceries: { label: "Groceries", color: "hsl(var(--chart-5))" },
  Entertainment: { label: "Entertainment", color: "hsl(var(--chart-1))" },
  Apparel: { label: "Apparel", color: "hsl(var(--chart-2))" },
  Transport: { label: "Transport", color: "hsl(var(--chart-3))" },
  Gifts: { label: "Gifts", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;


export function ReportDashboard() {
  const { user } = useAuth();
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && date?.from && date?.to) {
      const fetchExpenses = async () => {
        setLoading(true);
        const expensesCol = collection(db, "users", user.uid, "expenses");
        const q = query(
          expensesCol,
          where("date", ">=", Timestamp.fromDate(date.from!)),
          where("date", "<=", Timestamp.fromDate(date.to!))
        );
        const querySnapshot = await getDocs(q);
        const expensesData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: (data.date as Timestamp).toDate(),
          } as Expense;
        });
        setExpenses(expensesData);
        setLoading(false);
      };
      fetchExpenses();
    }
  }, [user, date]);

  const { totalSpend, avgDailySpend, biggestCategory, categoryData } =
    useMemo(() => {
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const days = date?.from && date?.to ? differenceInDays(date.to, date.from) + 1 : 1;
      const avg = total / days;

      const spendingByCategory: { [key in ExpenseCategory]?: number } = {};
      expenses.forEach((exp) => {
        spendingByCategory[exp.category] = (spendingByCategory[exp.category] || 0) + exp.amount;
      });

      let biggestCat: ExpenseCategory | string = "N/A";
      let maxSpend = 0;
      Object.entries(spendingByCategory).forEach(([category, amount]) => {
        if (amount > maxSpend) {
          maxSpend = amount;
          biggestCat = category;
        }
      });
      
      const chartData = Object.entries(spendingByCategory)
        .map(([name, amount]) => ({ name, amount }))
        .sort((a, b) => b.amount - a.amount);

      return {
        totalSpend: total,
        avgDailySpend: avg,
        biggestCategory: biggestCat,
        categoryData: chartData,
      };
    }, [expenses, date]);

  return (
    <div className="space-y-6">
      <div className="flex justify-start">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className="w-full md:w-[300px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
        </div>
      ) : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalSpend.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${avgDailySpend.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Biggest Category</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{biggestCategory}</div>
          </CardContent>
        </Card>
      </div>
      )}

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
            <Skeleton className="h-[400px] w-full" />
            <Skeleton className="h-[400px] w-full" />
        </div>
      ) : expenses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full aspect-video">
              <RechartsPieChart>
                 <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={categoryData} dataKey="amount" nameKey="name" innerRadius={60} labelLine={false} label>
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartConfig[entry.name as keyof typeof chartConfig]?.color} />
                    ))}
                </Pie>
                <Legend />
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spending Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full aspect-video">
              <RechartsBarChart data={categoryData}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="amount" radius={4}>
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartConfig[entry.name as keyof typeof chartConfig]?.color} />
                    ))}
                </Bar>
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        </div>
      ) : (
         <Card className="flex items-center justify-center h-64 col-span-full">
            <p className="text-muted-foreground">No expenses found for this period.</p>
         </Card>
      )}
    </div>
  );
}
