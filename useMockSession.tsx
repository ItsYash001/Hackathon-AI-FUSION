import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MockUser {
  userId: string;
  displayName: string;
}

interface MockSessionContextType {
  user: MockUser | null;
  isLoggedIn: boolean;
  login: (displayName: string) => void;
  logout: () => void;
}

const MockSessionContext = createContext<MockSessionContextType | undefined>(undefined);

const STORAGE_KEY = 'campus_mock_session';

export function MockSessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    // Load session from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (displayName: string) => {
    const newUser: MockUser = {
      userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      displayName,
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <MockSessionContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {children}
    </MockSessionContext.Provider>
  );
}

export function useMockSession() {
  const context = useContext(MockSessionContext);
  if (!context) {
    throw new Error('useMockSession must be used within MockSessionProvider');
  }
  return context;
}
