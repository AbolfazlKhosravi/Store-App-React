import { createContext, useContext, useEffect, useState } from "react";

const AuthProviderContext = createContext(null);
const AuthProviderContextDispath = createContext(null);

const AuthProvider = ({ children }) => {
  const [state, setSate] = useState(false);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authState")) || false;
    setSate(userData);
  }, []);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  return (
    <AuthProviderContext.Provider value={state}>
      <AuthProviderContextDispath.Provider value={setSate}>
        {children}
      </AuthProviderContextDispath.Provider>
    </AuthProviderContext.Provider>
  );
};
export const useAuth = () => useContext(AuthProviderContext);
export const useAuthActions = () => useContext(AuthProviderContextDispath);
export default AuthProvider;
