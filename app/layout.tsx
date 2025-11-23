import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Wealth Transfer - UK Inequality Visualized",
  description: "Interactive visualizations exploring how wealth flows from ordinary people to the ultra-wealthy in the UK.",
  keywords: "wealth inequality, UK economy, data visualization, economics, wealth distribution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
