import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, logoutRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  const logout = async () =>{
    try { 
      const res = await logoutRequest();    
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);      
    } catch (error) {
      console.log(error);     
    }
  }


    
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await verifyTokenRequest(); // Realiza la solicitud
        console.log("Token verification response:", res.data);
  
        // Si no hay datos o el token es inválido
        if (!res.data || !res.data.id) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
          return;
        }
  
        // Actualiza el estado con los datos del usuario
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
  
    checkLogin();
  }, []);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;