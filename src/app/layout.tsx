import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/scss/main.scss";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { TanstackQueryProvider } from "@/components/providers/TanstackQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies Web Site",
  description: "Special for Startup Summer 2024!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <TanstackQueryProvider>
          <MantineProvider>
            {children}
          </MantineProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
