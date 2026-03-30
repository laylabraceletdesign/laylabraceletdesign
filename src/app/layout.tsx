import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Layla Bracelet Design | Custom Beaded Bracelets Wholesale & Bulk",
  description:
    "Handmade custom beaded bracelets for bulk orders. Perfect for schools, corporate events, weddings, sports teams, churches, and birthday parties. Shop our full collection or request a custom order.",
  keywords:
    "bulk bracelets, custom beaded bracelets, wholesale bracelets, personalized bracelets, friendship bracelets",
  openGraph: {
    title: "Layla Bracelet Design",
    description: "Handmade custom bracelets for every occasion — made with love, delivered in bulk.",
    url: "https://laylabraceletdesign.com",
    siteName: "Layla Bracelet Design",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
