// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import Menu from "./pages/Menu";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import LanguageToggle from "./components/LanguageToggle";
import ConfirmedPage from "./pages/ConfirmedPage.tsx";
import RedirectIfAuthenticated from "./utils/RedirectIfAuthenticated";

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const isLoggedIn = !!localStorage.getItem("user-token");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <LanguageProvider>
            <Router>
                <LanguageToggle />

                <div className="flex flex-col min-h-screen">
                    <NavBar onSettingsClick={() => setSettingsOpen(true)} />

                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/catering" element={<Services />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/login" element={
                                <RedirectIfAuthenticated>
                                    <LoginPage />
                                </RedirectIfAuthenticated>} />
                            <Route path="/signup" element={
                                <RedirectIfAuthenticated>
                                    <SignupPage />
                                </RedirectIfAuthenticated>
                            } />
                            <Route path="/verify-email" element={
                                <RedirectIfAuthenticated>
                                    <VerifyEmailPage/>
                                </RedirectIfAuthenticated>} />
                            <Route path="/confirmed" element={<ConfirmedPage />} />
                            {/* 404 catch-all route */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>

                    <Modal
                        headerLabel="Settings"
                        isOpen={settingsOpen}
                        onCloseRequested={() => setSettingsOpen(false)}
                    >
                        <label className="flex items-center space-x-2 p-4">
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={() => setDarkMode((v) => !v)}
                                className="h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-[var(--color-accent)]"
                            />
                            <span className="text-gray-900 dark:text-gray-100">Dark Mode</span>
                        </label>

                        {/* See Favorites button - only show if logged in */}
                        {isLoggedIn && (
                            <Link
                                to="/menu"
                                onClick={() => setSettingsOpen(false)}
                                className="block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 m-4 rounded text-center transition-colors duration-200"
                            >
                                ❤️ See Favorites
                            </Link>
                        )}

                        {isLoggedIn ? (
                            <button
                                onClick={() => {
                                    localStorage.removeItem("user-token");
                                    window.location.href = "/login";
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 m-4 rounded"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    window.location.href = "/login";
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 m-4 rounded"
                            >
                                Login
                            </button>
                        )}
                    </Modal>
                </div>
            </Router>
        </LanguageProvider>
    );
};

export default App;