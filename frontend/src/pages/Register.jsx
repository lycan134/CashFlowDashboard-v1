import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";


function Register() {
    const { user, register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    function updateField(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        try {
            await register(form);
            navigate("/dashboard");
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to create account");
        }
    }

    return (
        <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow p-8 space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
                    <p className="text-sm text-slate-500 mt-1">Your financial data stays associated with your account.</p>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <input className="w-full border rounded p-3" name="username" placeholder="Username" value={form.username} onChange={updateField} required />
                <input className="w-full border rounded p-3" name="email" type="email" placeholder="Email" value={form.email} onChange={updateField} required />
                <input className="w-full border rounded p-3" name="password" type="password" placeholder="Password" value={form.password} onChange={updateField} minLength="8" required />
                <button className="w-full bg-slate-800 text-white rounded p-3" type="submit">Register</button>
                <p className="text-sm text-slate-500">Already registered? <Link className="text-slate-800 font-semibold" to="/login">Sign in</Link></p>
            </form>
        </main>
    );
}


export default Register;