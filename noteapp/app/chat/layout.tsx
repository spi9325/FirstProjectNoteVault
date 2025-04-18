import type { Metadata } from "next";
import "../globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { ChatBar } from "@/components/ChatBar";

export const metadata: Metadata = {
  title: "NoteVault",
  description: "Generated by NoteVault",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-black text-white flex">
        <ToastProvider />
        <ChatBar/>
        {children}
      </body>
    </html>
  );
}
