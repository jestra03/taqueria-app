// src/pages/VerifyEmailPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function VerifyEmailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const initialEmail = (location.state as { email?: string })?.email || "";

    const [email, setEmail] = useState(initialEmail);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE}/auth/verify-email`, {
                email,
                verificationCode: code
            });
            localStorage.setItem("user-token", res.data.token);
            navigate("/confirmed");
        } catch (err: any) {
            setError(err.response?.data?.error || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-40 p-6 border rounded bg-white">
            <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={loading}
                />
                <input
                    name="verificationCode"
                    placeholder="6-digit code"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={loading}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? <LoadingSpinner /> : "Verify"}
                </button>
            </form>
        </div>
    );
}
