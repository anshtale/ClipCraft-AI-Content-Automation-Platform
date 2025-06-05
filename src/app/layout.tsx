import "@/styles/globals.css";
import '../../public/font.css';
import { type Metadata } from "next";
import { Inter} from "next/font/google";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "./theme-provider";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "ClipCraft - AI",
  description: "Content Creation Automation Platform",
  icons: [{ rel: "icon", url: "/clipcraft_logo.png" }],
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TRPCReactProvider>
        {/* <PayPalScriptProvider options = {{clientId : process.env.PAYPAL_CLIENT_ID!}}> */}
          <ThemeProvider
             attribute="class"
             defaultTheme="system"
             enableSystem
             disableTransitionOnChange
             >
            <NextTopLoader color="#FFFFFF"/>
            <div className="w-full h-full flex items-center justify-center">
              {children}
            </div>
          </ThemeProvider>
          {/* </PayPalScriptProvider> */}
          <Toaster richColors/>
          </TRPCReactProvider>
      </body>
    </html>
  );
}
