"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, BarChartBig, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface NavItem {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Add Expense", icon: PlusCircle },
  { href: "/report", label: "Report", icon: BarChartBig },
];

export function TabNavigation() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full gap-1 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
     <Tabs value={pathname} className="w-full">
      <TabsList className={`grid w-full grid-cols-${navItems.length}`}>
         {navItems.map((item) => (
             <TabsTrigger value={item.href} asChild key={item.href}>
                <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                </Link>
             </TabsTrigger>
         ))}
      </TabsList>
    </Tabs>
  );
}
