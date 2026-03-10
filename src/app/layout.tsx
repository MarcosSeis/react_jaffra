import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Header } from "@/presentation/layouts/Header";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "React Jaffra",
  description: "Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
