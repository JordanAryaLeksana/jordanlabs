"use client";

import { useEffect, useState } from "react";
import { formatLocalTime } from "@/components/about/formatLocalTime";

export function LocalClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const intervalId = window.setInterval(() => setTime(formatLocalTime(new Date())), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return <time className="font-display text-2xl font-bold" suppressHydrationWarning>{time} WIB</time>;
}
