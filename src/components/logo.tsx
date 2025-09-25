import { Wallet } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Wallet className="h-6 w-6 text-primary" />
      <span className="font-bold text-lg">ExpenseWise</span>
    </Link>
  );
}
