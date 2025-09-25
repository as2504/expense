"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusCircle, BarChartBig, History, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItem {
    href: string;
    label: string;
    icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { href: "/", label: "Add Expense", icon: PlusCircle },
  { href: "/report", label: "Report", icon: BarChartBig },
  { href: "/history", label: "History", icon: History },
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
     <nav className="flex items-center space-x-6 text-sm font-medium">
         {navItems.map((item) => (
            <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                    "transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
            >
                {item.label}
            </Link>
         ))}
      </nav>
  );
}
