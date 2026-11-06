import type { Metadata } from "next";
import { bigHeaderFont, headerFont, paragraphFont } from "@/components/interfaces/ui/Typography/fonts";
import "./globals.css";
import { PortfolioChatProvider } from "@/components/pages/chat/PortfolioChatProvider";
import { PersistentChatDock } from "@/components/pages/chat/PersistentChatDock";
import { PORTFOLIO_URL } from "@/lib/config/links";
import { PROFILE } from "@/lib/config/profile";

export const metadata: Metadata = {
  metadataBase: new URL(PORTFOLIO_URL),
  title: `${PROFILE.fullName} — ${PROFILE.headline}`,
  description:
    "Jordan Arya Leksana is a software engineer (full-stack & AI) who ships to production: IntentCut, a solo-built AI video editor for the Meta Global AI Developer Hackathon 2026; this RAG-powered portfolio agent; live web apps; and industrial AI at Pertamina. Open to Software / Backend Engineer and AI Engineer roles, freelance work and remote teams.",
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
