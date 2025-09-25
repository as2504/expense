"use client";

import { CircleUserRound, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useAuth } from "./auth-provider";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Logo } from "./logo";
import { TabNavigation, navItems } from "./tab-navigation";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";


export function AppHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>

        {!isMobile && (
          <div className="flex-1">
              <TabNavigation />
          </div>
        )}

        {isMobile && (
           <div className="flex-1">
             <Sheet>
                 <SheetTrigger asChild>
                     <Button variant="outline" size="icon">
                         <Menu className="h-5 w-5" />
                         <span className="sr-only">Toggle Menu</span>
                     </Button>
                 </SheetTrigger>
                 <SheetContent side="left">
                     <nav className="grid gap-6 text-lg font-medium">
                         <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                             <Logo />
                         </Link>
                         {navItems.map(item => (
                              <Link href={item.href} key={item.href} className="text-muted-foreground hover:text-foreground">
                                 {item.label}
                             </Link>
                         ))}
                     </nav>
                 </SheetContent>
             </Sheet>
         </div>
        )}

        <div className="flex items-center justify-end">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <CircleUserRound className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
