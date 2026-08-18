"use client";

import {
  useCallback,
  useState,
  useSyncExternalStore,
} from "react";

export type IntroPhase = "intro" | "exiting" | "done";

const PHASE_ORDER: readonly IntroPhase[] = ["intro", "exiting", "done"];

function subscribeToNothing() {
  return () => {};
}

function getStaticSkipSnapshot(): boolean {
  return new URLSearchParams(window.location.search).get("skipIntro") === "1";
}

/** Snapshot server selalu false, supaya HTML awal konsisten dengan render klien pertama. */
function getStaticSkipServerSnapshot(): boolean {
  return false;
}

const FREEZABLE_PHASES: readonly IntroPhase[] = ["intro"];

/**
 * Dibaca di klien: fase tempat urutan intro dibekukan bila URL memuat
 * ?freezeIntro=intro -- dipakai HANYA untuk kebutuhan development saat
 * mengedit OpeningSequence, supaya
 * fase itu tidak keburu berpindah/keluar ke Home selagi diedit. Kembalikan
 * null bila parameter tidak ada, artinya urutan berjalan normal.
 */
function getFreezePhaseSnapshot(): IntroPhase | null {
  const requestedPhase = new URLSearchParams(window.location.search).get("freezeIntro");
  return FREEZABLE_PHASES.find((phase) => phase === requestedPhase) ?? null;
}

function getFreezePhaseServerSnapshot(): IntroPhase | null {
  return null;
}

interface UseIntroSequenceResult {
  phase: IntroPhase;
  /**
   * Dipanggil dari OpeningSequence atau wipe keluar di IntroSequence untuk
   * berpindah ke fase berikutnya.
   */
  advancePhase: () => void;
  skipSequence: () => void;
}

/**
 * Hook ini digunakan untuk mengatur urutan fase IntroSequence (intro ->
 * exiting -> done) sebagai satu-satunya sumber kebenaran urutan
 * fase, sehingga komponen controller (IntroSequence.tsx) tidak perlu
 * mendefinisikan state machine sendiri (CLAUDE.md §9).
 *
 * Perpindahan antar-fase TIDAK digerakkan oleh timer tetap -- advancePhase()
 * hanya dipanggil oleh komponen presentational saat animasinya sendiri
 * selesai (CLAUDE.md §11), sehingga durasi total intro mengikuti durasi
 * animasi sesungguhnya, bukan angka yang dihardcode di sini.
 *
 * URL ?skipIntro=1 dapat mempercepat langsung ke "done" untuk kebutuhan
 * development. Kunjungan dan refresh normal selalu mulai dari intro agar
 * server render dan hydration tidak berbeda lalu menimbulkan flash ke Home.
 *
 * ?freezeIntro=intro membekukan urutan tepat di
 * fase itu (mengabaikan advancePhase() dan skip apa pun) -- alat bantu
 * development saat mengedit OpeningSequence tanpa terus-terusan
 * kehilangan tampilannya ke transisi keluar/Home.
 */
export function useIntroSequence(): UseIntroSequenceResult {
  const shouldSkipStatically = useSyncExternalStore(
    subscribeToNothing,
    getStaticSkipSnapshot,
    getStaticSkipServerSnapshot
  );
  const freezePhase = useSyncExternalStore(
    subscribeToNothing,
    getFreezePhaseSnapshot,
    getFreezePhaseServerSnapshot
  );
  const shouldSkip = freezePhase === null && shouldSkipStatically;

  const [timerPhase, setTimerPhase] = useState<IntroPhase>("intro");

  const advancePhase = useCallback(() => {
    setTimerPhase((current) => {
      if (current === freezePhase) return current;

      const nextPhase = PHASE_ORDER[PHASE_ORDER.indexOf(current) + 1];
      return nextPhase ?? current;
    });
  }, [freezePhase]);

  const skipSequence = useCallback(() => {
    if (freezePhase === null) setTimerPhase("exiting");
  }, [freezePhase]);

  return { phase: shouldSkip ? "done" : timerPhase, advancePhase, skipSequence };
}
