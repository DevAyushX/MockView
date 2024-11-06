import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "MockView AI" ,
  // description: "Generated by create next app",
  icons:{
    icon:'/mockview.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <Toaster />
      {children}</body>
    </html>
    </ClerkProvider>
  );
}