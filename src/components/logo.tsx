import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="text-primary"
      >
        <circle cx="12" cy="12" r="10" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" />
        <circle cx="12" cy="12" r="8" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeOpacity="0.5" />
        <path
            d="M5 15.5V15A1 1 0 0 1 6 14H18A1 1 0 0 1 19 15V15.5"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="1.5"
            fill="hsl(var(--primary-foreground))"
            fillOpacity="0.2"
        ></path>
        <path
            d="M8 14V11H10V14"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M14 14V11H16V14"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M11 14V11H13V14"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
        <path
            d="M6.5 10.5L12 8L17.5 10.5"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        ></path>
      </svg>
      <span className="font-bold text-lg">ExpenseWise</span>
    </Link>
  );
}
