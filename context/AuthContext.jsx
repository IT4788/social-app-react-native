import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
