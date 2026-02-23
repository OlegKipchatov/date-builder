"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { getLS, removeLS, setLS } from "./storage";

export type UseLocalStorageResult<T> = readonly [
  T,
  Dispatch<SetStateAction<T>>,
  () => void,
];

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): UseLocalStorageResult<T> => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    setValue(getLS<T>(key, initialValue));
  }, [initialValue, key]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      setValue(getLS<T>(key, initialValue));
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [initialValue, key]);

  useEffect(() => {
    setLS<T>(key, value);
  }, [key, value]);

  const clear = () => {
    removeLS(key);
    setValue(initialValue);
  };

  return [value, setValue, clear] as const;
};
