# **App Name**: ExpenseWise

## Core Features:

- User Authentication: Secure user login using Google sign-in or email/password, managed by Firebase Authentication.
- Expense Input: Form to input expense details: date, amount, category (dropdown), and optional notes.
- Data Storage: Store and sync expense data in real-time using Firestore.
- Expense Reporting: Display total spend, average daily spend, and biggest spending category, filtered by date range, using responsive charts (e.g., Chart.js).
- Budget Setting: Allow users to set a monthly budget and store it in Firestore.
- Budget Comparison: Compare current month's spending to the budget, displaying a visual indicator (progress bar) and status (green if under, red if over).
- PWA Support: Implement service workers for offline access and PWA capabilities.

## Style Guidelines:

- Primary color: Light blue (#A0D2EB) to evoke calmness and trustworthiness.
- Background color: Very light blue (#F0F8FF), almost white, complementing the primary color and providing a clean backdrop.
- Accent color: Soft orange (#FFB347) to highlight important actions and data points.
- Body and headline font: 'PT Sans' (sans-serif) for a modern and readable feel.
- Mobile-first, responsive layout with tab-style navigation (top or bottom).
- Simple, consistent icons for expense categories and navigation.
- Subtle transitions and animations for a smooth user experience.