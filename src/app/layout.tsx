import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مشکات غیب | پلتفرم سینمایی ایمان به غیب و تجلی کلام قرآن",
  description: "سامانه تعاملی ایمان به غیب، استودیوی سینمایی آیات، آینه ضمیر و چت با عطر الهی، و آزمون معرفتی تدبر در کلام وحی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07090e] text-[#e2e8f0] font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 min-h-screen">
        {children}
      </body>
    </html>
  );
}
