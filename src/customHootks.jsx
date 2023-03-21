import { useState, useEffect } from "react";

export const useStoredValue = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const storedState = localStorage.getItem(key);
    return storedState === undefined | storedState === null ? defaultValue : JSON.parse(storedState);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};
