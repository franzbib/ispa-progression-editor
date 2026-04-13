"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { sampleProgressionDoc } from "@/data/sample-progressions";
import { hashProgressionDoc } from "@/lib/progression/document";
import { ProgressionDoc } from "@/lib/types/progression";
import { validateProgressionDoc } from "@/lib/validators/progression";

const STORAGE_KEY = "ispa-progression-editor.doc.v1";
const EXPORTED_HASH_KEY = "ispa-progression-editor.last-exported-hash";
const HISTORY_LIMIT = 20;

interface HistoryState {
  past: ProgressionDoc[];
  present: ProgressionDoc;
  future: ProgressionDoc[];
}

export function useProgressionDocument(seed: ProgressionDoc = sampleProgressionDoc) {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: seed,
    future: []
  });
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [lastExportedHash, setLastExportedHash] = useState(hashProgressionDoc(seed));

  useEffect(() => {
    try {
      const rawDoc = window.localStorage.getItem(STORAGE_KEY);
      const rawExportedHash = window.localStorage.getItem(EXPORTED_HASH_KEY);

      if (rawExportedHash) {
        setLastExportedHash(rawExportedHash);
      }

      if (!rawDoc) {
        setHasLoadedStorage(true);
        return;
      }

      const parsed = JSON.parse(rawDoc) as unknown;
      const validation = validateProgressionDoc(parsed);

      if (!validation.success) {
        setStorageError(
          `Sauvegarde locale ignoree: ${validation.errors.slice(0, 2).join(" ")}`
        );
        setHasLoadedStorage(true);
        return;
      }

      setHistory({
        past: [],
        present: validation.data,
        future: []
      });
      setHasLoadedStorage(true);
    } catch (error) {
      setStorageError(
        error instanceof Error
          ? `Impossible de lire la sauvegarde locale: ${error.message}`
          : "Impossible de lire la sauvegarde locale."
      );
      setHasLoadedStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history.present));
    } catch (error) {
      setStorageError(
        error instanceof Error
          ? `Impossible d'enregistrer localement: ${error.message}`
          : "Impossible d'enregistrer localement."
      );
    }
  }, [hasLoadedStorage, history.present]);

  const commit = useCallback((nextDoc: ProgressionDoc) => {
    setHistory((current) => {
      if (hashProgressionDoc(current.present) === hashProgressionDoc(nextDoc)) {
        return current;
      }

      return {
        past: [...current.past, current.present].slice(-HISTORY_LIMIT),
        present: nextDoc,
        future: []
      };
    });
  }, []);

  const replace = useCallback((nextDoc: ProgressionDoc) => {
    setHistory({
      past: [],
      present: nextDoc,
      future: []
    });
  }, []);

  const reset = useCallback(() => {
    replace(seed);
    setLastExportedHash(hashProgressionDoc(seed));
    window.localStorage.removeItem(EXPORTED_HASH_KEY);
  }, [replace, seed]);

  const undo = useCallback(() => {
    setHistory((current) => {
      const previous = current.past.at(-1);

      if (!previous) {
        return current;
      }

      return {
        past: current.past.slice(0, -1),
        present: previous,
        future: [current.present, ...current.future].slice(0, HISTORY_LIMIT)
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((current) => {
      const next = current.future[0];

      if (!next) {
        return current;
      }

      return {
        past: [...current.past, current.present].slice(-HISTORY_LIMIT),
        present: next,
        future: current.future.slice(1)
      };
    });
  }, []);

  const markExported = useCallback((doc: ProgressionDoc) => {
    const hash = hashProgressionDoc(doc);
    setLastExportedHash(hash);
    window.localStorage.setItem(EXPORTED_HASH_KEY, hash);
  }, []);

  const isDirty = useMemo(
    () => hashProgressionDoc(history.present) !== lastExportedHash,
    [history.present, lastExportedHash]
  );

  return {
    doc: history.present,
    commit,
    replace,
    reset,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    isDirty,
    markExported,
    storageError,
    hasLoadedStorage
  };
}
