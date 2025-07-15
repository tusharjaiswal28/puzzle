import{ createContext, useContext, useState, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // On load, check if user is stored in localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = (userData, jwt) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwt);
        setUser(userData);
        setToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming context
export const useAuth = () => useContext(AuthContext);
