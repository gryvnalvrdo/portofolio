"use client";

import { useSyncExternalStore, useCallback } from "react";

export type Lang = "en" | "id";

const STORAGE_KEY = "lang";
const EVENT_NAME = "portfolio-lang-change";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT_NAME, callback);
  };
}

function getSnapshot(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "id" ? "id" : "en";
}

function getServerSnapshot(): Lang {
  return "en";
}

export function useLanguage(): [Lang, () => void] {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleLang = useCallback(() => {
    const next: Lang = getSnapshot() === "en" ? "id" : "en";
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  return [lang, toggleLang];
}
