"use client";

import { useState, type FormEvent } from "react";
import { usePortfolioChat } from "@/components/pages/chat/usePortfolioChat";
import { isChatBusy } from "@/components/pages/chat/isChatBusy";

export function useAgentComposer() {
  const { sendMessage, status } = usePortfolioChat();
  const [draftMessage, setDraftMessage] = useState("");

  const disabled = isChatBusy(status);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = draftMessage.trim();

    if (message === "" || disabled) {
      return;
    }

    sendMessage({ text: message });
    setDraftMessage("");
  }

  return {
    draftMessage,
    disabled,
    setDraftMessage,
    submitMessage,
  };
}