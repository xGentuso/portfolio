import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import CommandPalette from "@/components/ui/CommandPalette";
import Footer from "@/components/layout/Footer";
import { Analytics } from '@vercel/analytics/react';
import { metadata } from "./metadata";
import ParticleBackground from "@/components/ParticleBackground";

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
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ParticleBackground />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
          <div className="fixed top-6 right-6" style={{ zIndex: 50 }}>
            <ThemeSwitcher />
          </div>
          <div className="fixed bottom-8 left-8" style={{ zIndex: 50 }}>
            <CommandPalette />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
