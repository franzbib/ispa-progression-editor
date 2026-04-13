"use client";

import { KeyboardEvent, useEffect, useState } from "react";

interface EditableTextProps {
  value: string;
  ariaLabel: string;
  className?: string;
  onCommit: (value: string) => void;
}

export function EditableText({ value, ariaLabel, className, onCommit }: EditableTextProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  function commit() {
    if (draft.trim() !== value) {
      onCommit(draft);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }

    if (event.key === "Escape") {
      setDraft(value);
      event.currentTarget.blur();
    }
  }

  return (
    <input
      aria-label={ariaLabel}
      className={className}
      value={draft}
      onBlur={commit}
      onChange={(event) => setDraft(event.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}
