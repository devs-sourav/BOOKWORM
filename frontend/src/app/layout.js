import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReduxProvider } from "@/store/ReduxProvider";
import AuthInitializer from "@/components/Authinitializer";
import { Navbar } from "@/components/shared/Navbar";

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
        <ReduxProvider>
          <AuthInitializer />
          <div>
            <Navbar></Navbar>
              <div>{children}</div>
            
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
