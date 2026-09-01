import type { Metadata } from "next";
import { bigHeaderFont, headerFont, paragraphFont } from "@/components/interfaces/ui/Typography/fonts";
import "./globals.css";
import { PortfolioChatProvider } from "@/components/pages/chat/PortfolioChatProvider";
import { PersistentChatDock } from "@/components/pages/chat/PersistentChatDock";

export const metadata: Metadata = {
  title: "Jordan Arya Leksana — AI & Software Engineer",
  description:
    "Portfolio of Jordan Arya Leksana: AI systems that ship — pump anomaly detection at Pertamina, multi-task deep learning for earthquake precursors (EMQNET), and AI-based skin screening (DermSight). Ask the built-in AI assistant anything.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
  },
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
      <body className="min-h-full flex flex-col">
        <PortfolioChatProvider>
          {children}
          <PersistentChatDock />
        </PortfolioChatProvider>
      </body>
    </html>
  );
}
