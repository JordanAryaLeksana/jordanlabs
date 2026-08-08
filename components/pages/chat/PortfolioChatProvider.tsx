"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";

import { executeNavigateToPage } from "@/components/pages/chat/navigation/executeNavigateToPage";
import { executeScrollToSection } from "@/components/pages/chat/navigation/executeScrollToSection";
import { executeHighlightSection } from "@/components/pages/chat/navigation/executeHighlightSection";
import { executeOpenProjectDetail } from "@/components/pages/chat/navigation/executeOpenProjectDetail";
import { PortfolioChatContext } from "@/components/pages/chat/PortfolioChatContext";

interface PortfolioChatProviderProps {
  children: ReactNode;
}

type AddToolOutput =
  ReturnType<typeof useChat>["addToolOutput"];

export function PortfolioChatProvider({
  children,
}: PortfolioChatProviderProps) {
  const router = useRouter();

  /*
   * Callback onToolCall berada di dalam konfigurasi useChat.
   * Ref memastikan callback selalu memakai addToolOutput
   * milik instance chat yang sama.
   */
  const addToolOutputRef =
    useRef<AddToolOutput | null>(null);

  const chat = useChat({
    onToolCall: ({ toolCall }) => {
      const addToolOutput =
        addToolOutputRef.current;

      if (!addToolOutput) {
        console.error(
          "[PortfolioChat] addToolOutput belum tersedia."
        );

        return;
      }

      console.log(
        "[PortfolioChat] tool received:",
        toolCall
      );

      if (
        toolCall.toolName === "navigateToPage"
      ) {
        const output = executeNavigateToPage({
          input: toolCall.input,

          /*
           * Navigasi dijadwalkan setelah addToolOutput
           * mendapat kesempatan memperbarui state chat.
           */
          navigate: (route) => {
            window.setTimeout(() => {
              router.push(route);
            }, 0);
          },
        });

        addToolOutput({
          tool: "navigateToPage",
          toolCallId: toolCall.toolCallId,
          output,
        });

        console.log(
          "[PortfolioChat] navigate output added:",
          {
            toolCallId: toolCall.toolCallId,
            output,
          }
        );

        return;
      }

      if (
        toolCall.toolName === "scrollToSection"
      ) {
        try {
          const output = executeScrollToSection({
            input: toolCall.input,

            findSection: (sectionId) => {
              return document.getElementById(
                sectionId
              );
            },
          });

          addToolOutput({
            tool: "scrollToSection",
            toolCallId: toolCall.toolCallId,
            output,
          });

          console.log(
            "[PortfolioChat] scroll output added:",
            {
              toolCallId: toolCall.toolCallId,
              output,
            }
          );
        } catch (error) {
          console.error(
            "[PortfolioChat] scroll execution failed:",
            error
          );

          addToolOutput({
            tool: "scrollToSection",
            toolCallId: toolCall.toolCallId,
            output: {
              status: "error",
              message:
                "The portfolio section could not be opened.",
            },
          });
        }

        return;
      }
      if (
        toolCall.toolName === "highlightSection"
      ) {
        try {
          /*
           * Tool call-nya hanya highlightSection,
           * tetapi client menggabungkan dua aksi:
           *
           * 1. Scroll menuju section
           * 2. Highlight section tersebut
           */
          const scrollOutput =
            executeScrollToSection({
              input: toolCall.input,

              findSection: (sectionId) => {
                return document.getElementById(
                  sectionId
                );
              },
            });

          if (scrollOutput.status === "error") {
            addToolOutput({
              tool: "highlightSection",
              toolCallId: toolCall.toolCallId,
              output: {
                status: "error",
                sectionId: scrollOutput.sectionId,
                message: scrollOutput.message,
              },
            });

            return;
          }

          const highlightOutput =
            executeHighlightSection({
              input: toolCall.input,

              findSection: (sectionId) => {
                return document.getElementById(
                  sectionId
                );
              },
            });

          if (
            highlightOutput.status === "error"
          ) {
            addToolOutput({
              tool: "highlightSection",
              toolCallId: toolCall.toolCallId,
              output: highlightOutput,
            });

            return;
          }

          const output = {
            status: "success" as const,
            sectionId:
              highlightOutput.sectionId,
            message:
              "Moved to and highlighted the requested portfolio section.",
          };

          addToolOutput({
            tool: "highlightSection",
            toolCallId: toolCall.toolCallId,
            output,
          });

          console.log(
            "[PortfolioChat] highlight output added:",
            {
              toolCallId: toolCall.toolCallId,
              output,
            }
          );
        } catch (error) {
          console.error(
            "[PortfolioChat] highlight execution failed:",
            error
          );

          /*
           * Walaupun eksekusi client gagal,
           * tool call tetap harus menerima result.
           */
          addToolOutput({
            tool: "highlightSection",
            toolCallId: toolCall.toolCallId,
            output: {
              status: "error",
              message:
                "The portfolio section could not be highlighted.",
            },
          });
        }

        return;
      }
      if (
        toolCall.toolName ===
        "openProjectDetail"
      ) {
        try {
          const output =
            executeOpenProjectDetail({
              input: toolCall.input,

              navigate: (target) => {
                /*
                 * Result tool disimpan lebih dahulu
                 * sebelum route berubah.
                 */
                window.setTimeout(() => {
                  router.push(target);
                }, 0);
              },
            });

          addToolOutput({
            tool: "openProjectDetail",
            toolCallId: toolCall.toolCallId,
            output,
          });

          console.log(
            "[PortfolioChat] project detail output added:",
            {
              toolCallId:
                toolCall.toolCallId,
              output,
            }
          );
        } catch (error) {
          console.error(
            "[PortfolioChat] project detail execution failed:",
            error
          );

          addToolOutput({
            tool: "openProjectDetail",
            toolCallId: toolCall.toolCallId,
            output: {
              status: "error",
              message:
                "The requested project detail could not be opened.",
            },
          });
        }

        return;
      }
      console.warn(
        "[PortfolioChat] unhandled tool:",
        toolCall.toolName
      );
    },

    onError: (error) => {
      console.error(
        "[PortfolioChat] client chat error:",
        error
      );
    },
  });

  useEffect(() => {
    addToolOutputRef.current =
      chat.addToolOutput;
  }, [chat.addToolOutput]);

  return (
    <PortfolioChatContext.Provider
      value={chat}
    >
      {children}
    </PortfolioChatContext.Provider>
  );
}