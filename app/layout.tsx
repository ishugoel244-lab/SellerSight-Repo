import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SellerSight",
  description: "Amazon review intelligence for sellers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-b from-white via-[#d7faff] to-[#b3ecff] text-black`}
      >
        {children}
      </body>
    </html>
  );
}
