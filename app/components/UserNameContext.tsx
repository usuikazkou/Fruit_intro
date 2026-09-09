"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserNameContextValue = {
  name: string;
  setName: (name: string) => void;
  ready: boolean;
};

const UserNameContext = createContext<UserNameContextValue | null>(null);
const STORAGE_KEY = "visitor-name";

export function UserNameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setNameState] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setNameState(saved);
    } catch {
      // localStorage unavailable, ignore
    }
    setReady(true);
  }, []);

  const setName = (value: string) => {
    setNameState(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage unavailable, ignore
    }
  };

  return (
    <UserNameContext.Provider value={{ name, setName, ready }}>
      {children}
    </UserNameContext.Provider>
  );
}

export function useUserName() {
  const ctx = useContext(UserNameContext);
  if (!ctx) {
    throw new Error("useUserName must be used within UserNameProvider");
  }
  return ctx;
}
