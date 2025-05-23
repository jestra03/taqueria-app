// src/components/NotFound.tsx
import React from "react";
import { useTranslation } from "../i18n/useTranslation";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const t = useTranslation;
    const navigate = useNavigate();

    return (
        <div className="standard-page w-full min-h-screen bg-white dark:bg-gray-900 pt-75">
            <h1 className="text-4xl font-bold text-center dark:text-white">
                {t("notFoundTitle")}
            </h1>
            <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
                {t("notFoundMessage")}
            </p>
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => navigate("/")}
                    className="
            bg-[var(--color-primary)] text-white
            hover:brightness-90 transition
            px-[var(--space-lg)] py-[var(--space-md)]
            rounded
          "
                >
                    {t("goHome")}
                </button>
            </div>
        </div>
    );
};

export default NotFound;
