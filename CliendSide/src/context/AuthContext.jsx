import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/check-session", {
        credentials: "include",
      });

      const data = await res.json();
      console.log("checkSession response:", data);
      console.log("loggedIn:", loggedIn);
console.log("user:", user);

      if (res.ok && data.loggedIn) {
        setLoggedIn(true);
        setUser(data.user);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth Session Error:", error);
      setLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async () => {
    await checkSession();
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }

    setLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        loading,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}