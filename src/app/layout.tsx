import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import CommandPalette from "@/components/ui/CommandPalette";
import Footer from "@/components/layout/Footer";
import { Analytics } from '@vercel/analytics/react';
import { metadata } from "./metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider>
          <div className="min-h-screen relative">
            <div className="fixed top-6 right-6 z-50">
              <ThemeSwitcher />
            </div>
            <div className="fixed bottom-8 left-8 z-50">
              <CommandPalette />
            </div>
            <main className="relative">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
