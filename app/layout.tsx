import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trixsol | Premium Digital Agency",
  description: "A premium, high-conversion agency crafting cinematic web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.className} antialiased selection:bg-accent selection:text-black`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main className="min-h-screen relative">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}