import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";


function Login() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        try {
            await login(username, password);
            navigate("/dashboard");
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to sign in");
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
                    <p className="text-sm text-slate-500 mt-1">Sign in to manage your cash flow.</p>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <input className="w-full border rounded p-3" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} required />
                <input className="w-full border rounded p-3" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                <button className="w-full bg-slate-800 text-white rounded p-3" type="submit">Sign in</button>
                <p className="text-sm text-slate-500">Need an account? <Link className="text-slate-800 font-semibold" to="/register">Register</Link></p>
            </form>
        </main>
    );
}


export default Login;