import type { Metadata } from "next";
import { bigHeaderFont, headerFont, paragraphFont } from "@/components/ui/Typography/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jordan Arya Leksana — AI & Software Engineer",
  description:
    "Portfolio of Jordan Arya Leksana: AI systems that ship — pump anomaly detection at Pertamina, multi-task deep learning for earthquake precursors (EMQNET), and AI-based skin screening (DermSight). Ask the built-in AI assistant anything.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bigHeaderFont.variable} ${headerFont.variable} ${paragraphFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=window.localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
