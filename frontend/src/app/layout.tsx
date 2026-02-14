import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IlluVista - Interactive Virtual Art Gallery",
  description: "Experience art in a digital dimension.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Navbar />
                <CartSidebar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

