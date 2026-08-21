import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { Navigate } from "react-router-dom";

import api from "../api/axios";


const AuthContext = createContext(null);


export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("current_user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            setLoading(false);
            return;
        }

        api.get("/auth/me")
            .then((response) => {
                setUser(response.data);
                localStorage.setItem("current_user", JSON.stringify(response.data));
            })
            .catch(() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("current_user");
                setUser(null);
            })
            .finally(() => setLoading(false));
    }, []);

    async function login(username, password) {
        const body = new URLSearchParams();
        body.append("username", username);
        body.append("password", password);

        const tokenResponse = await api.post("/auth/login", body, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        localStorage.setItem("access_token", tokenResponse.data.access_token);
        const userResponse = await api.get("/auth/me");
        setUser(userResponse.data);
        localStorage.setItem("current_user", JSON.stringify(userResponse.data));
    }

    async function register(userData) {
        await api.post("/auth/register", userData);
        await login(userData.username, userData.password);
    }

    function logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("current_user");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}


export function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen bg-slate-100" />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}