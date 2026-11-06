import { useEffect, useState } from "react";

export function updateLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore write errors (e.g. storage full or disabled)
  }
}

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    updateLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}
