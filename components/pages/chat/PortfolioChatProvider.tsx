"use client";

import {
  useEffect,
  useRef,
  useLayoutEffect,
  type ReactNode,
} from "react";
import { useChat } from "@ai-sdk/react";
import { useRouter, usePathname } from "next/navigation";

import { executeNavigateToPage } from "@/components/pages/chat/navigation/executeNavigateToPage";
import { executeScrollToSection } from "@/components/pages/chat/navigation/executeScrollToSection";
import { executeHighlightSection } from "@/components/pages/chat/navigation/executeHighlightSection";
import { executeOpenProjectDetail } from "@/components/pages/chat/navigation/executeOpenProjectDetail";
import { PortfolioChatContext } from "@/components/pages/chat/PortfolioChatContext";
import { getSectionPageRoute } from "@/lib/tools/navigation/getSectionPageRoute";
import { isHighlightSectionInput } from "@/lib/tools/navigation/isHighlightSectionInput";
import { isScrollToSectionInput } from "@/lib/tools/navigation/isScrollToSectionInput";
import type { PendingSectionAction } from "@/components/pages/chat/navigation/pendingSectionAction";
import { isServerExecutedToolName } from "@/lib/tools/isServerExecutedToolName";
import {
  PAGE_ROUTES,
  PROJECT_IDS,
  SECTION_IDS,
  type SectionId,
} from "@/lib/tools/types";
const ALLOWED_PAGE_ROUTES =
  new Set<string>(
    Object.values(PAGE_ROUTES)
  );

const ALLOWED_PROJECT_IDS =
  new Set<string>(
    Object.values(PROJECT_IDS)
  );
const ALLOWED_SECTION_IDS =
  new Set<string>(
    Object.values(SECTION_IDS)
  );
interface PortfolioChatProviderProps {
  children: ReactNode;
}

type AddToolOutput =
  ReturnType<typeof useChat>["addToolOutput"];
type PendingDeterministicSectionAction = {
  kind: "scroll" | "highlight";
  sectionId: SectionId;
};
export function PortfolioChatProvider({
  children,
}: PortfolioChatProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const pendingSectionActionRef =
    useRef<PendingSectionAction | null>(
      null
    );
  const pendingDeterministicSectionActionRef =
    useRef<
      PendingDeterministicSectionAction | null
    >(null);
  /*
   * Callback onToolCall berada di dalam konfigurasi useChat.
   * Ref memastikan callback selalu memakai addToolOutput
   * milik instance chat yang sama.
   */
  const addToolOutputRef =
    useRef<AddToolOutput | null>(null);

  const chat = useChat({
    onData: (part) => {
      if (
        part.type !==
        "data-navigationAction"
      ) {
        return;
      }

      const data = part.data;

      if (
        typeof data !== "object" ||
        data === null
      ) {
        return;
      }

      const action = data as {
        kind?: unknown;
        route?: unknown;
        projectId?: unknown;
        sectionId?: unknown;
      };

      if (
        action.kind === "route" &&
        typeof action.route === "string" &&
        ALLOWED_PAGE_ROUTES.has(
          action.route
        )
      ) {
        router.push(
          action.route
        );

        return;
      }

      if (
        action.kind === "project" &&
        typeof action.projectId ===
        "string" &&
        ALLOWED_PROJECT_IDS.has(
          action.projectId
        )
      ) {
        router.push(
          `/projects/${action.projectId}`
        );

        return;
      }

      if (
        (
          action.kind === "scroll" ||
          action.kind === "highlight"
        ) &&
        typeof action.sectionId ===
        "string" &&
        ALLOWED_SECTION_IDS.has(
          action.sectionId
        )
      ) {
        const sectionId =
          action.sectionId as SectionId;

        const existingSection =
          document.getElementById(
            sectionId
          );

        /*
         * Section sudah tersedia
         * pada halaman aktif.
         */
        if (existingSection) {
          const scrollOutput =
            executeScrollToSection({
              input: {
                sectionId,
              },

              findSection: (id) =>
                document.getElementById(
                  id
                ),
            });

          if (
            scrollOutput.status ===
            "error"
          ) {
            console.error(
              "[PortfolioChat] deterministic scroll failed:",
              scrollOutput
            );

            return;
          }

          if (
            action.kind ===
            "highlight"
          ) {
            const highlightOutput =
              executeHighlightSection({
                input: {
                  sectionId,
                },

                findSection: (id) =>
                  document.getElementById(
                    id
                  ),
              });

            if (
              highlightOutput.status ===
              "error"
            ) {
              console.error(
                "[PortfolioChat] deterministic highlight failed:",
                highlightOutput
              );
            }
          }

          return;
        }

        /*
         * Section ada pada page lain.
         */
        const targetRoute =
          getSectionPageRoute(
            sectionId
          );

        if (!targetRoute) {
          console.error(
            "[PortfolioChat] deterministic section has no page route:",
            sectionId
          );

          return;
        }

        pendingDeterministicSectionActionRef.current =
        {
          kind: action.kind,
          sectionId,
        };

        router.push(targetRoute);

        return;
      }
    },
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
        toolCall.toolName ===
        "navigateToPage"
      ) {
        try {
          const output =
            executeNavigateToPage({
              input: toolCall.input,

              /*
               * Navigasi dijadwalkan setelah
               * addToolOutput mendapat kesempatan
               * memperbarui state chat.
               */
              navigate: (route) => {
                window.setTimeout(() => {
                  router.push(route);
                }, 0);
              },
            });

          addToolOutput({
            tool: "navigateToPage",
            toolCallId:
              toolCall.toolCallId,
            output,
          });

          if (
            process.env.NODE_ENV ===
            "development"
          ) {
            console.log(
              "[PortfolioChat] navigate output added:",
              {
                toolCallId:
                  toolCall.toolCallId,
                output,
              }
            );
          }
        } catch (error) {
          console.error(
            "[PortfolioChat] navigation execution failed:",
            error
          );

          addToolOutput({
            tool: "navigateToPage",
            toolCallId:
              toolCall.toolCallId,
            state: "output-error",
            errorText:
              "The requested page could not be opened.",
          });
        }

        return;
      }

      if (
        toolCall.toolName === "scrollToSection"
      ) {
        try {
          if (
            !isScrollToSectionInput(
              toolCall.input
            )
          ) {
            addToolOutput({
              tool: "scrollToSection",
              toolCallId:
                toolCall.toolCallId,
              output: {
                status: "error",
                message:
                  "The requested portfolio section is invalid.",
              },
            });

            return;
          }

          const existingSection =
            document.getElementById(
              toolCall.input.sectionId
            );

          /*
           * Section ada di halaman aktif.
           * Tidak perlu navigasi.
           */
          if (existingSection) {
            const output =
              executeScrollToSection({
                input: toolCall.input,

                findSection: (sectionId) => {
                  return document.getElementById(
                    sectionId
                  );
                },
              });

            addToolOutput({
              tool: "scrollToSection",
              toolCallId:
                toolCall.toolCallId,
              output,
            });

            return;
          }

          /*
           * Section tidak ada.
           * Cari halaman pemiliknya.
           */
          const targetRoute =
            getSectionPageRoute(
              toolCall.input.sectionId
            );

          if (!targetRoute) {
            addToolOutput({
              tool: "scrollToSection",
              toolCallId:
                toolCall.toolCallId,
              output: {
                status: "error",
                sectionId:
                  toolCall.input.sectionId,
                message:
                  "This section belongs to a project detail. Open a project first.",
              },
            });

            return;
          }

          /*
           * Kalau sudah di route yang seharusnya
           * tetapi section tidak ada, jangan loop.
           */
          if (pathname === targetRoute) {
            addToolOutput({
              tool: "scrollToSection",
              toolCallId:
                toolCall.toolCallId,
              output: {
                status: "error",
                sectionId:
                  toolCall.input.sectionId,
                message:
                  "The requested section is not available on this page.",
              },
            });

            return;
          }

          pendingSectionActionRef.current = {
            kind: "scroll",
            toolCallId:
              toolCall.toolCallId,
            sectionId:
              toolCall.input.sectionId,
          };

          router.push(targetRoute);
        } catch (error) {
          console.error(
            "[PortfolioChat] scroll execution failed:",
            error
          );

          addToolOutput({
            tool: "scrollToSection",
            toolCallId:
              toolCall.toolCallId,
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
        toolCall.toolName ===
        "highlightSection"
      ) {
        try {
          if (
            !isHighlightSectionInput(
              toolCall.input
            )
          ) {
            addToolOutput({
              tool: "highlightSection",
              toolCallId:
                toolCall.toolCallId,
              output: {
                status: "error",
                message:
                  "The requested portfolio section is invalid.",
              },
            });

            return;
          }

          const existingSection =
            document.getElementById(
              toolCall.input.sectionId
            );

          /*
           * Kalau section sudah ada:
           * scroll + highlight langsung.
           */
          if (existingSection) {
            const scrollOutput =
              executeScrollToSection({
                input: toolCall.input,

                findSection: (sectionId) => {
                  return document.getElementById(
                    sectionId
                  );
                },
              });

            if (
              scrollOutput.status === "error"
            ) {
              addToolOutput({
                tool: "highlightSection",
                toolCallId:
                  toolCall.toolCallId,
                output: scrollOutput,
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

            addToolOutput({
              tool: "highlightSection",
              toolCallId:
                toolCall.toolCallId,
              output: {
                ...highlightOutput,

                message:
                  highlightOutput.status ===
                    "success"
                    ? "The requested section was opened and highlighted."
                    : highlightOutput.message,
              },
            });

            return;
          }

          const targetRoute =
            getSectionPageRoute(
              toolCall.input.sectionId
            );

          if (!targetRoute) {
            addToolOutput({
              tool: "highlightSection",
              toolCallId:
                toolCall.toolCallId,
              output: {
                status: "error",
                sectionId:
                  toolCall.input.sectionId,
                message:
                  "This section belongs to a project detail. Open a project first.",
              },
            });

            return;
          }

          if (pathname === targetRoute) {
            addToolOutput({
              tool: "highlightSection",
              toolCallId:
                toolCall.toolCallId,
              output: {
                status: "error",
                sectionId:
                  toolCall.input.sectionId,
                message:
                  "The requested section is not available on this page.",
              },
            });

            return;
          }

          pendingSectionActionRef.current = {
            kind: "highlight",
            toolCallId:
              toolCall.toolCallId,
            sectionId:
              toolCall.input.sectionId,
          };

          router.push(targetRoute);
        } catch (error) {
          console.error(
            "[PortfolioChat] highlight execution failed:",
            error
          );

          addToolOutput({
            tool: "highlightSection",
            toolCallId:
              toolCall.toolCallId,
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

      if (
        isServerExecutedToolName(
          toolCall.toolName
        )
      ) {
        if (
          process.env.NODE_ENV ===
          "development"
        ) {
          console.log(
            "[PortfolioChat] server tool received:",
            toolCall.toolName
          );
        }

        /*
         * Tidak memanggil addToolOutput.
         * Tool ini sudah memiliki execute()
         * dan result-nya dibuat oleh server.
         */
        return;
      }
      console.error(
        "[PortfolioChat] unsupported client tool:",
        toolCall.toolName
      );

      addToolOutput({
        tool: toolCall.toolName,
        toolCallId: toolCall.toolCallId,
        state: "output-error",
        errorText:
          "This portfolio action is not supported.",
      });
    },


    onError: (error) => {
      console.error(
        "[PortfolioChat] client chat error:",
        error
      );
    },
  });
  useEffect(() => {
    const pendingAction =
      pendingSectionActionRef.current;

    if (!pendingAction) {
      return;
    }

    /*
     * Tunggu browser menyelesaikan commit DOM
     * halaman yang baru.
     */
    const frameId =
      window.requestAnimationFrame(() => {
        const addToolOutput =
          addToolOutputRef.current;

        if (!addToolOutput) {
          return;
        }

        if (
          pendingAction.kind === "scroll"
        ) {
          const output =
            executeScrollToSection({
              input: {
                sectionId:
                  pendingAction.sectionId,
              },

              findSection: (sectionId) => {
                return document.getElementById(
                  sectionId
                );
              },
            });

          addToolOutput({
            tool: "scrollToSection",
            toolCallId:
              pendingAction.toolCallId,
            output: {
              ...output,

              message:
                output.status === "success"
                  ? "Opened the relevant page and moved to the requested section."
                  : output.message,
            },
          });

          pendingSectionActionRef.current =
            null;

          return;
        }

        const scrollOutput =
          executeScrollToSection({
            input: {
              sectionId:
                pendingAction.sectionId,
            },

            findSection: (sectionId) => {
              return document.getElementById(
                sectionId
              );
            },
          });

        if (
          scrollOutput.status === "error"
        ) {
          addToolOutput({
            tool: "highlightSection",
            toolCallId:
              pendingAction.toolCallId,
            output: scrollOutput,
          });

          pendingSectionActionRef.current =
            null;

          return;
        }

        const highlightOutput =
          executeHighlightSection({
            input: {
              sectionId:
                pendingAction.sectionId,
            },

            findSection: (sectionId) => {
              return document.getElementById(
                sectionId
              );
            },
          });

        addToolOutput({
          tool: "highlightSection",
          toolCallId:
            pendingAction.toolCallId,
          output: {
            ...highlightOutput,

            message:
              highlightOutput.status ===
                "success"
                ? "Opened the relevant page and highlighted the requested section."
                : highlightOutput.message,
          },
        });

        pendingSectionActionRef.current =
          null;
      });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);
  useEffect(() => {
    const pending =
      pendingDeterministicSectionActionRef.current;

    if (!pending) {
      return;
    }

    const targetRoute =
      getSectionPageRoute(
        pending.sectionId
      );

    if (
      !targetRoute ||
      pathname !== targetRoute
    ) {
      return;
    }

    pendingDeterministicSectionActionRef.current =
      null;

    const frameId =
      window.requestAnimationFrame(
        () => {
          const scrollOutput =
            executeScrollToSection({
              input: {
                sectionId:
                  pending.sectionId,
              },

              findSection: (
                sectionId
              ) =>
                document.getElementById(
                  sectionId
                ),
            });

          if (
            scrollOutput.status ===
            "error"
          ) {
            console.error(
              "[PortfolioChat] pending deterministic scroll failed:",
              scrollOutput
            );

            return;
          }

          if (
            pending.kind ===
            "highlight"
          ) {
            const highlightOutput =
              executeHighlightSection({
                input: {
                  sectionId:
                    pending.sectionId,
                },

                findSection: (
                  sectionId
                ) =>
                  document.getElementById(
                    sectionId
                  ),
              });

            if (
              highlightOutput.status ===
              "error"
            ) {
              console.error(
                "[PortfolioChat] pending deterministic highlight failed:",
                highlightOutput
              );
            }
          }
        }
      );

    return () => {
      window.cancelAnimationFrame(
        frameId
      );
    };
  }, [pathname]);
  useLayoutEffect(() => {
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