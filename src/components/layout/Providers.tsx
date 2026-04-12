"use client";

import { SessionProvider } from "next-auth/react";
import CustomCursor from "@/components/ui/CustomCursor";
import PageLoader from "@/components/ui/PageLoader";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PageLoader />
      <ScrollProgressBar />
      <CustomCursor />
      {children}
      <WhatsAppFloat />
    </SessionProvider>
  );
}
