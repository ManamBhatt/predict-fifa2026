import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WC 2026 Predictor",
  description: "Real-time win probability leaderboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
