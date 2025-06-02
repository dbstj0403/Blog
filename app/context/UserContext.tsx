'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'ADMIN' | 'USER';

interface UserState {
  id: number;
  name: string;
  email: string;
  image: string;
  role: Role;
}

interface UserContextType {
  user: UserState | null;
  setUser: (user: UserState | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined); // ✅ 대문자

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserState | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
