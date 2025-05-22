// src/App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";       // ← import here
import { LanguageProvider } from "./i18n/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";

const App: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

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
                            <Route path="/catering" element={<Services />} />
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
                            <span className="text-gray-900 dark:text-gray-100">
                Dark Mode
              </span>
                        </label>
                    </Modal>
                </div>
            </Router>
        </LanguageProvider>
    );
};

export default App;
