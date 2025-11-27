import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🔥 FINAL FIXED METADATA
export const metadata: Metadata = {
  title: "SellerSight — Amazon Review Intelligence for Sellers",
  description:
    "AI-powered review insights, sentiment analysis, and competitor intelligence for Amazon sellers.",
  keywords: [
    "Amazon reviews",
    "Product intelligence",
    "Sentiment analysis",
    "Ecommerce analytics",
    "AI for Amazon sellers",
    "SellerSight",
  ],
  icons: {
    icon: "/logo.png", // Browser tab icon
    appleTouchIcon: "/logo.png", // iOS Home Screen
    shortcut: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
