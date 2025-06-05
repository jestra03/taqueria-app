// src/pages/ConfirmedPage.tsx
import { useNavigate } from "react-router-dom";

export default function ConfirmedPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded p-8 text-center">
                <h1 className="text-2xl font-semibold mb-4 text-green-600">Account Created!</h1>
                <p className="mb-6 text-gray-700">Your account has been successfully created. You have been automatically logged in!</p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    Home
                </button>
            </div>
        </div>
    );
}
