'use client'
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvier";
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [isClosed, setIsClosed] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className} style={{backgroundColor:'white'}}>
        <AuthProvider>
          {/* <Navbar /> */}
          {/* <Sidebar setIsClosed={setIsClosed} /> */}
          {/* <div className={`${isClosed ? "ml-[224px]" : "ml-[80px]"}`}> */}
            {children}
          {/* </div> */}
          <ToastProvider>
            <Toaster />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}