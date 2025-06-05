// src/components/RedirectIfAuthenticated.tsx
import {JSX, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectIfAuthenticated({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("user-token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    return children;
}
