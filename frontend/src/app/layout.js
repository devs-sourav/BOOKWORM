import { Inter } from "next/font/google";
import "./globals.css";

// Load the Inter font and assign to a CSS variable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "BookWorm",
  description: "BookWorm",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
