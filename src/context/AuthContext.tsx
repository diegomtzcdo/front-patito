import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest } from "../api/auth";
import { User } from "../interfaces/User";
import { Cliente } from "../interfaces/Cliente";
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

interface AuthContextType {
    user: User | null;
    token: string | null;
    signup: (user: Cliente) => Promise<void>;
    signin: (user: User) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    errors: string;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);

    // clear errors after 5 seconds
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const signup = async (user: Cliente) => {
        try {
            const res = await registerRequest(user);
            if (res.status === 200) {
                setUser(res.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log(error);
            //setErrors(error.response.data.message);
        }
    };

    const signin = async (user: User) => {
        try {
            const res = await loginRequest(user.email, user.password);
            
            console.log(res.data.access_token);
            //setUser(res.data);
            setToken(res.data.access_token);
            setCookie('access_token', res.data.access_token);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                const errorMessage = error.message;
                console.log(errorMessage); // Accede a la propiedad 'message'
                if(errorMessage == 'Request failed with status code 400') {
                    setErrors('Correo o email incorrecto');
                }
                // setErrors(errorMessage);
            } else {
                console.log("Error is not an instance of Error:", error);
            }
        }
    };

    const logout = () => {
        //Cookies.remove("token");
        removeCookie('access_token');
        removeCookie('pedidos');
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const checkLogin = async () => {
            setLoading(true);
            const cookieToken = getCookie('access_token');
            if(cookieToken) {
                setIsAuthenticated(true);
                setLoading(false);
                setToken(cookieToken);
                return;
            }
            /*const cookies = Cookies.get();
            if (!cookies.token) {
              setIsAuthenticated(false);
              setLoading(false);
              return;
            }
      
            try {
              const res = await verifyTokenRequest(cookies.token);
              console.log(res);
              if (!res.data) return setIsAuthenticated(false);
              setIsAuthenticated(true);
              setUser(res.data);
              setLoading(false);
            } catch (error) {
              setIsAuthenticated(false);
              setLoading(false);
            }*/
        };
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
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