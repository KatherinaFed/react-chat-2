import { User } from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { userStateListener } from '../firebase';

interface AuthProps {
  children?: ReactNode;
}

export const AuthContext = createContext({
  currentUser: {} as User | null,
});

export const AuthProvider = ({ children }: AuthProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, [setCurrentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
