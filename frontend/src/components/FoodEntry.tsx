// src/components/FoodEntry.tsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "../i18n/useTranslation";
import axios from "axios";
import images from "../utils/importImages";
import { Heart } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface MenuItem {
    id: number;
    title: string;
    price: number;
    choices?: string[];
    style?: string[];
    photo?: string;
    desc?: string;
}

interface FoodEntryProps {
    item: MenuItem;
    userFavorites?: string[]; // Pass favorites from parent
    onFavoriteChange?: (itemId: number, isFavorited: boolean) => void; // Callback for state updates
}

const FoodEntry: React.FC<FoodEntryProps> = ({ item, userFavorites = [], onFavoriteChange }) => {
    const t = useTranslation;
    const token = localStorage.getItem("user-token");
    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const photoSrc =
        item.photo && images[item.photo] ? images[item.photo] : images["default.png"];

    // Check if this item is in user's favorites
    useEffect(() => {
        setIsFavorited(userFavorites.includes(item.id.toString()));
    }, [userFavorites, item.id]);

    async function toggleFavorite() {
        if (!token || isLoading) return;

        setIsLoading(true);
        try {
            if (isFavorited) {
                // Remove from favorites
                await axios.delete(
                    `${API_BASE}/menu/favorites/remove`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        data: { foodId: item.id }
                    }
                );
                console.log("✅ Removed from favorites");
                setIsFavorited(false);
                onFavoriteChange?.(item.id, false);
            } else {
                // Add to favorites
                await axios.post(
                    `${API_BASE}/menu/favorites/add`,
                    { foodId: item.id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log("✅ Added to favorites");
                setIsFavorited(true);
                onFavoriteChange?.(item.id, true);
            }
        } catch (err) {
            console.error("❌ Favorite toggle failed:", err);

            if (axios.isAxiosError(err)) {
                console.error("Response:", err.response?.data);
            }

            // Revert optimistic update on error
            // setIsFavorited(!isFavorited);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative w-56 p-4 bg-[var(--color-form-bg)] dark:bg-[var(--color-form-bg-dark)] rounded-lg shadow">
            {token && (
                <button
                    onClick={toggleFavorite}
                    disabled={isLoading}
                    title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    className={`absolute top-2 right-2 p-1 rounded-full shadow transition-all duration-200 ${
                        isLoading
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:scale-110 active:scale-95'
                    } ${
                        isFavorited
                            ? 'bg-red-100 dark:bg-red-900/30'
                            : 'bg-white dark:bg-gray-700'
                    }`}
                >
                    <Heart
                        className={`w-5 h-5 transition-colors duration-200 ${
                            isFavorited
                                ? 'text-red-500 fill-current'
                                : 'text-gray-400 hover:text-red-400'
                        }`}
                    />
                </button>
            )}

            <h5 className="text-lg font-medium mb-2">{item.title}</h5>

            <div className="w-full h-40 bg-white rounded overflow-hidden flex items-center justify-center mb-2">
                {photoSrc ? (
                    <img
                        src={photoSrc}
                        alt={item.title}
                        className="object-cover h-full"
                    />
                ) : (
                    <span className="text-gray-500">{t("noPhoto")}</span>
                )}
            </div>

            <p className="mb-2">
                <span className="font-semibold">{t("foodPriceLabel")}</span>{" "}
                ${item.price.toFixed(2)}
            </p>

            {item.choices && (
                <div className="mb-2">
                    <label className="block font-medium mb-1">
                        {t("foodChoicesLabel")}
                    </label>
                    <select
                        id={`choice-${item.id}`}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800"
                    >
                        {item.choices.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {item.style && (
                <div className="mb-2">
                    <label className="block font-medium mb-1">{t("foodStyleLabel")}</label>
                    <div className="flex flex-wrap gap-2">
                        {item.style.map((s) => (
                            <label key={s} className="flex items-center space-x-1">
                                <input type="checkbox" value={s} />
                                <span>{s}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {item.desc && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {item.desc}
                </p>
            )}
        </div>
    );
};

export default FoodEntry;