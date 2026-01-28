import { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { useScrollToTop } from "@/hooks/useScrollToTop";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  useScrollToTop();
  
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[73px]">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </HelmetProvider>
  );
};
