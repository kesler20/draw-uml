import { useEffect, useState } from "react";

export const useStoredValue = <T,>(defaultValue: T, key: string) => {
  const [value, setValue] = useState<T>(() => {
    const storedState = localStorage.getItem(key);
    return storedState === undefined || storedState === null
      ? defaultValue
      : (JSON.parse(storedState) as T);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
